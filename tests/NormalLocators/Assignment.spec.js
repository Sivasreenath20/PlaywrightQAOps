const {test,expect} = require("@playwright/test");

async function logingIn(page1) {
    await page1.goto("https://eventhub.rahulshettyacademy.com/");
    await page1.getByPlaceholder("you@email.com").fill("sivasreenath890@gmail.com");
    await page1.getByLabel("Password").fill("Thammudu@2001");
    await page1.locator("#login-btn").click();
}
function getFutureDateTime(daysAhead = 7) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    
    // Format to YYYY-MM-DDTHH:mm (Required format for <input type="datetime-local">)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
test("Complete testing", async ({page}) => {

    //Step 1: Login to the application
    logingIn(page);
    await page.waitForLoadState("networkidle");
    await expect(await page.getByText("Browse Events →")).toBeVisible();

    //Step 2: Create an event
    await page.getByRole("button", {name: "Admin"}).click()
    await page.locator(".absolute a").first().waitFor();
    await page.locator(".absolute a").first().click();
    const title = "Test Event "+Date.now();
    await page.locator("#event-title-input").fill(title);
    await page.locator("#admin-event-form textarea").fill("This is a test event");
    await page.getByLabel("City").fill("Bangalore");
    await page.getByLabel("Venue").fill("Bangalore Palace");
    const futureDateValue = getFutureDateTime(7);
    await page.getByLabel("Event Date & Time").fill(futureDateValue);
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created")).toBeVisible();
    console.log("Created event: "+title);

    //Step 3: Verify the event is listed
    await page.locator("#nav-events").click();
    await expect(page.locator("#event-card").first()).toBeVisible();
    const eventCard = await page.locator("#event-card").filter({hasText: title});
    await expect(eventCard).toBeVisible();
    const seats = await eventCard.locator(".text-emerald-600").first().innerText(); 
    const seatsBeforeBooking = parseInt(seats);
    console.log("Seats available before booking: "+seatsBeforeBooking);

    //step 4: Start Booking
    await eventCard.locator("#book-now-btn").click();

    //step 5: Fill booking form
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill("Siva Sreenath");
    await page.locator("#customer-email").fill("sivasreenath555@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
    await page.locator(".confirm-booking-btn").click();

    //Step 6: Verify booking confirmation
    const bookingRef = await page.locator(".booking-ref").textContent();
    await expect(page.locator(".booking-ref")).toBeVisible();

    //step 7: Verify in My Bookings
    await page.getByRole("button", {name: "View My Bookings"}).click();
    await page.locator("#booking-card").first().waitFor();
    const bookingCard = page.locator("#booking-card");
    await expect(bookingCard.first()).toBeVisible();

    const matchingCard = bookingCard.filter({has: page.locator('.booking-ref', {hasText: bookingRef})});
    await expect(matchingCard).toBeVisible();
    await expect(matchingCard.locator(".text-base")).toHaveText(title);

    //Step 8: Verify seat count is reduced
    await page.locator("#nav-events").click();
    await expect(page.locator("#event-card").first()).toBeVisible();
    const seats1 = await eventCard.locator(".text-emerald-600").first().innerText(); 
    const seatsAfterBooking = parseInt(seats1);

    await expect(seatsAfterBooking === seatsBeforeBooking - 1);
});

// test ("Complete testing 2", async ({page}) => {

//     //Step 1: Login to the application
//     logingIn(page);
// });
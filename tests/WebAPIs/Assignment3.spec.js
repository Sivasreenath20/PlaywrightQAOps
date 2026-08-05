const { test, expect, request } = require('@playwright/test');
const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};
const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};
let webContext;
test.beforeAll(async ({browser}) => {
    const requestContext = await browser.newContext();
    const page = await requestContext.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.getByPlaceholder("you@email.com").fill("sivasreenath890@gmail.com");
    await page.getByLabel("Password").fill("Thammudu@2001");
    await page.locator("#login-btn").click();
    await page.waitForLoadState("networkidle");
    await requestContext.storageState({path: 'state2.json'});
    webContext = await browser.newContext({storageState: 'state2.json'});
});


test ("test 1 Banner IS visible when 6 events are returned",async ()=>{
    const page = await webContext.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.waitForLoadState("networkidle");
    await expect(await page.getByText("Browse Events →")).toBeVisible();
    //Step 1 — Set up the API mock

    await page.route("**/api/events**", async route => {
        route.fulfill(
        {
            status: 200,
            content_type: "application/json",
            body: JSON.stringify(SIX_EVENTS_RESPONSE),
        });
    });
    await page.locator("#nav-events").click();
    await expect(page.locator("#event-card").first()).toBeVisible();
    await expect(page.locator("#event-card")).toHaveCount(6);

    const banner = await page.getByText(/sandbox holds up to/i);
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('9 bookings');
});

test ("Test 2 Banner IS visible when 4 events are returned",async ()=>{
    const page = await webContext.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.waitForLoadState("networkidle");
    await expect(await page.getByText("Browse Events →")).toBeVisible();
    //Step 1 — Set up the API mock

    await page.route("**/api/events**", async route => {
        route.fulfill(
        {
            status: 200,
            content_type: "application/json",
            body: JSON.stringify(FOUR_EVENTS_RESPONSE),
        });
    });
    await page.locator("#nav-events").click();
    await expect(page.locator("#event-card").first()).toBeVisible();
    await expect(page.locator("#event-card")).toHaveCount(4);
    const banner = await page.getByText(/sandbox holds up to/i);
    await expect(banner).not.toBeVisible();
});
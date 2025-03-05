// import { firefox, Page } from "playwright";
//
// async function scrapeHotels(page: Page) {
//     const hotelContainer = page.locator('div#hotelListingContainer');
//
//     let previousHeight = 0;
//     let retries = 3;
//
//     while (retries > 0) {
//         await page.evaluate(() => {
//             window.scrollBy(0, window.innerHeight);
//         });
//
//         await page.waitForTimeout(1000);
//
//         const currentHeight = await page.evaluate((selector) => {
//             return document.querySelector(selector)?.scrollHeight || 0;
//         }, 'div#hotelListingContainer');
//
//         if (currentHeight > previousHeight) {
//             previousHeight = currentHeight;
//             retries = 3;
//         } else {
//             retries -= 1;
//         }
//     }
//
//     console.log(await hotelContainer.count());
//
//     await hotelContainer.locator('div.listingRowOuter').first().waitFor();
//
//     const hotelLocator = await hotelContainer.locator('div.listingRowOuter').all();
//
//     console.log(hotelLocator.length);
//
//     const obj: Record<string, any> = {};
//
//     for (const hotel of hotelLocator) {
//         const link = await hotel.locator('a').first().getAttribute('href');
//
//         console.log(link);
//
//         const hotelNameLocator = hotel.locator('div.listingRow div.flexOne div.makeFlex div.flexOne div.makeFlex');
//         const hotelNameL = hotelNameLocator.locator('p.latoBlack');
//
//         let hotelName = '';
//
//         if (await hotelNameL.count() > 1) {
//             hotelName = await hotelNameL.nth(1).innerText();
//         } else {
//             hotelName = await hotelNameL.nth(0).innerText();
//         }
//
//         console.log(hotelName);
//
//         const price = await hotel.locator('div.listingRow div.flexOne div.textRight div.tile__priceSection p.priceText').innerText();
//
//         console.log(price);
//
//         obj[hotelName] = [link, hotelName, price];
//     }
//     return obj;
// }
//
// (async () => {
//     try {
//         const browser = await firefox.launch({ headless: false });
//         const context = await browser.newContext();
//         const page = await context.newPage();
//
//         await page.goto('https://www.makemytrip.com/hotels/pune-hotels.html');
//
//         const allHotels = await scrapeHotels(page);
//         console.log("All Hotels:", allHotels);
//
//         const parentLocator = page.locator('div.appendBottom35 div#POPULAR ul.filterList');
//         const fiveStarLocator = parentLocator.locator('li:has-text("5 Star")');
//         await fiveStarLocator.click();
//
//         const fiveStarHotels = await scrapeHotels(page);
//         console.log("Five-Star Hotels:", fiveStarHotels);
//
//         await browser.close();
//     } catch (error) {
//         console.log(error);
//     }
// })();

import { firefox, Page } from "playwright";

async function scrollToEnd(page: Page, containerSelector: string) {
    let previousHeight = 0;
    let retries = 3;

    while (retries > 0) {
        await page.evaluate((selector) => {
            const container = document.querySelector(selector);
            if (container) {
                container.scrollBy(0, container.scrollHeight);
            } else {
                window.scrollBy(0, window.innerHeight);
            }
        }, containerSelector);

        await page.waitForTimeout(1000);

        const currentHeight = await page.evaluate((selector) => {
            const container = document.querySelector(selector);
            return container ? container.scrollHeight : document.body.scrollHeight;
        }, containerSelector);

        if (currentHeight > previousHeight) {
            previousHeight = currentHeight;
            retries = 3;
        } else {
            retries -= 1;
        }
    }
}

async function scrapeHotels(page: Page) {
    const hotelContainerSelector = 'div#hotelListingContainer';

    await scrollToEnd(page, hotelContainerSelector);

    const hotelContainer = page.locator(hotelContainerSelector);
    console.log(await hotelContainer.count());

    await hotelContainer.locator('div.listingRowOuter').first().waitFor();

    const hotelLocator = await hotelContainer.locator('div.listingRowOuter').all();
    console.log(hotelLocator.length);

    const obj: Record<string, any> = {};

    for (const hotel of hotelLocator) {
        const link = await hotel.locator('a').first().getAttribute('href');
        console.log(link);

        const hotelNameLocator = hotel.locator('div.listingRow div.flexOne div.makeFlex div.flexOne div.makeFlex');
        const hotelNameL = hotelNameLocator.locator('p.latoBlack');

        let hotelName = '';
        if (await hotelNameL.count() > 1) {
            hotelName = await hotelNameL.nth(1).innerText();
        } else {
            hotelName = await hotelNameL.nth(0).innerText();
        }
        console.log(hotelName);

        const price = await hotel.locator('div.listingRow div.flexOne div.textRight div.tile__priceSection p.priceText').innerText();
        console.log(price);

        obj[hotelName] = [link, hotelName, price];
    }
    return obj;
}

(async () => {
    try {
        const browser = await firefox.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.makemytrip.com/hotels/pune-hotels.html');

        const allHotels = await scrapeHotels(page);
        console.log("All Hotels:", allHotels);

        const parentLocator = page.locator('div.appendBottom35 div#POPULAR ul.filterList');
        const fiveStarLocator = parentLocator.locator('li:has-text("5 Star")');
        await fiveStarLocator.click();

        const fiveStarHotels = await scrapeHotels(page);
        console.log("Five-Star Hotels:", fiveStarHotels);

        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();


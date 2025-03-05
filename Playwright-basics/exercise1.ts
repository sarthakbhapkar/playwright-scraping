import {chromium} from 'playwright';

interface Heading {
    [key: string]: {
        [subKey: string]: string;
    };
}

interface SubHeading {
    [key: string]: string;
}

(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://wiki.noovosoft.com/resources');
    if (!await page.locator('div.login-form').isVisible()) {
        await page.goto('https://wiki.noovosoft.com/login');
        console.log("Landed on login page");
    } else {
        console.log("Landed on login page");
    }

    await page.locator('div.login-form input[type="email"]').fill('sarthak.bhapkar@noovosoft.com');
    await page.locator('div.login-form input[type="password"]').fill('Sarthak@30');
    console.log("Entered email and password");
    await page.locator('button:has-text("Log In")').click();

    try {
        await page.waitForSelector('v-application--wrap', {timeout: 5000});
        console.log("Login successful, navigating to homepage.");
    } catch (error) {
        if (!await page.locator('text=Welcome').nth(0).isVisible()) {
            await page.goto('https://wiki.noovosoft.com/');
            console.log("Login successful, navigating to homepage.")
        } else {
            const err = await page.getByRole('status').textContent();
            console.log(`${err}`);
        }
    }

    if (!await page.locator('text=Welcome').nth(0).isVisible()) {
        await page.goto('https://wiki.noovosoft.com/');
        console.log("You are not on home page, navigating to homepage.");
    }

    await page.waitForSelector('div[tabindex="0"],a[tabindex="0"]')
    const topicsInNav = page.locator('div[tabindex="0"],a[tabindex="0"]');
    const topicsText = await topicsInNav.allTextContents();
    console.log("Topics in Navigation Bar:", topicsText);

    const content: Heading = {};

    const divLocator = page.locator('div.contents');
    const h1Elements = await divLocator.locator('h1').allInnerTexts();
    const ulLocators = divLocator.locator('ul');

    const baseUrl = page.url();

    for (let i = 0; i < h1Elements.length; i++) {
        const headingText = h1Elements[i].trim();
        if (!headingText) continue;

        content[headingText]= {};

        const ulElement = ulLocators.nth(i);
        const liLinks = await ulElement.locator('li > a').all();

        const subTopics: SubHeading = {};
        for (const link of liLinks) {
            try {
                const subText = (await link.innerText()).trim();
                const subHref = await link.getAttribute('href');

                if (subText && subHref) {
                    subTopics[subText] = new URL(subHref, baseUrl).href;
                }
            } catch (error) {
                console.error(`Error processing link: ${error}`);
            }
        }

        content[headingText] = subTopics;
    }

    console.log("Structured Content:", JSON.stringify(content, null, 2));

})();
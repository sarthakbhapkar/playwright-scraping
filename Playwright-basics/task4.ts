import {chromium, Locator, Page} from 'playwright';
import * as dotenv from 'dotenv';

dotenv.config();

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function clickElementsWithMatchingParts(elements: Locator[], part: string) {
    try {
        await Promise.all(elements.map(async (element) => {
            const innerText = await element.innerText();
            if (innerText === part) {
                await element.click();
                await delay(1000);
            }
        }))
    } catch (error) {
        console.log(`Error While Clicking an Element:${error}`)
    }
}

async function navigateToPath(path: string, page: Page): Promise<{ [key: string]: any } | string> {
    const pathParts: string[] = path.split('=>').map((pathElm) => pathElm.trim());
    const navBarLocator = page.locator('div.v-navigation-drawer__content');
    const mainTopic = pathParts[0];

    if (!navBarLocator) {
        throw new Error('Navigation Bar not found');
    }

    const directory: { [key: string]: any } = {};

    try {
        console.log('Scraping the:', mainTopic)
        for (const part of pathParts) {
            const matchingFolders = await navBarLocator.locator(`div[tabindex="0"]:has-text("${part}")`).all();
            const matchingLinks = await navBarLocator.locator(`a[tabindex="0"]:has-text("${part}")`).all();

            if (matchingFolders.length === 0 && matchingLinks.length === 0) {
                return "Invalid Path";
            }

            await clickElementsWithMatchingParts(matchingFolders, part)
            await clickElementsWithMatchingParts(matchingLinks, part)
        }

        await delay(1000);
        await page.waitForSelector('ul.v-breadcrumbs');
        const pageContentColumn = page.locator('div.page-col-sd')
        const infoBox = pageContentColumn.locator('div.pa-5');
        const isCorrectInfo = pageContentColumn.locator('span::has-text("Last Edited By")');

        directory[mainTopic] = {
            path: path,
            lastEditedBy: null,
            date: null,
            tags: [],
            title: null,
            topics: {}
        };

        if (infoBox && isCorrectInfo) {
            directory[mainTopic].lastEditedBy = await infoBox.locator('div.body-2').innerText();
            directory[mainTopic].date = await infoBox.locator('div.caption').innerText();

            console.log('Last Edited By:', directory[mainTopic].lastEditedBy)
            console.log('Last Edited Date:', directory[mainTopic].date);
        }

        const correctTagsLocator = pageContentColumn.locator('div.teal--text::has-text("Tags")')

        if (infoBox && correctTagsLocator) {
            const tags = await infoBox.locator('a').all();
            directory[mainTopic].tags = (await Promise.all(tags.map(async (tag) => await tag.innerText()))).filter(allTags => allTags !== '')
        }

        directory[mainTopic].title = await page.locator('div.headline').innerText();

        const locatorInContentSection = page.locator('div.contents');
        const topics = await locatorInContentSection.locator('h1, h2').all();
        const content: Record<string, any> = {};
        let currentTopic = '';

        for (const topic of topics) {
            const tagName = await topic.evaluate(el => el.tagName);
            const text = await topic.innerText();

            if (tagName === 'H1' && text) {
                currentTopic = text;
                content[currentTopic] = {};
            } else if (tagName === 'H2' && currentTopic) {
                const subtopicText = text;
                const subTopicLink = await topic.locator('a').getAttribute('href');
                content[currentTopic][subtopicText] = subTopicLink ? new URL(subTopicLink, page.url()).href : null;
            }
        }

        directory[mainTopic].topics = content;

        const root = navBarLocator.locator('div[tabindex="0"]:has-text("/ sidebar.root")').nth(0);
        await root.click();
        await page.goto('https://wiki.noovosoft.com');
        await delay(1000);
    } catch (error) {
        console.error(`Error Occurred in Path: ${path} - ${error}`);
        return `Error while navigating: ${error}`;
    }
    return directory;
}

(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    if (!username || !password) {
        console.log('Username or Password is not available');
        return;
    }

    await page.goto('https://wiki.noovosoft.com/login');
    await page.locator('div.login-form input[type="email"]').fill(username);
    await page.locator('div.login-form input[type="password"]').fill(password);

    await page.locator('button:has-text("Log In")').click();
    await page.waitForURL('https://wiki.noovosoft.com');

    try {
        console.log(JSON.stringify(await navigateToPath('JavaScript=> Exercises', page), null, 2));
        await delay(2000)
        console.log(JSON.stringify(await navigateToPath('CSS=> Bootstrap =>Customize CSS', page), null, 2));
        await delay(2000)
        console.log(JSON.stringify(await navigateToPath('IntelliJ=>Knewifujkbbrek', page), null, 2));
    } catch (error) {
        console.error("An error occurred during Navigation:", error);
    }

    await browser.close();
})();

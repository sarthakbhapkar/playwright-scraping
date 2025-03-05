import {firefox, Locator, Page} from "playwright";
import * as dotenv from 'dotenv';

dotenv.config();

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

interface Content {
    [key: string]: {
        lastEditedBy?: string | null;
        lastEditedAt?: string | null;
        link: string;
        externalLinks?: (string | null)[];
        subTopics: Record<string, { link: string, subTopics: Record<string, any> }>;
    };
}

const folders: string[] = [];

async function scrapeInformation(page: Page, folderName: string, navBar: Locator, content: Content) {
    try {
        const firstLink = navBar.locator('a').first();
        await firstLink.click();

        await delay(2000);
        await page.waitForSelector('ul.v-breadcrumbs');

        const pageContentColumn = page.locator('div.page-col-sd');
        const infoBox = pageContentColumn.locator('div.pa-5');

        content[folderName] = {
            ...content[folderName],
            lastEditedBy: null,
            lastEditedAt: null,
            externalLinks: []
        };

        content[folderName].lastEditedBy = await infoBox.locator('div.body-2').innerText();
        content[folderName].lastEditedAt = await infoBox.locator('div.caption').innerText();

        const contentSection = page.locator('div.contents');
        const Links = await contentSection.locator('a').all();

        const asyncMapFilter = async <T>(array: T[], callBackFun: (value: T) => Promise<string | null>): Promise<string[]> => {
            const results = await Promise.all(array.map(callBackFun));
            return results.filter((href) => href !== null) as string[];
        };

        const externalLinksInWiki = await asyncMapFilter(Links, async (link) => {
            const href = await link.getAttribute('href');
            return href && href.startsWith('https://') ? href : null;
        });

        console.log('External Links', externalLinksInWiki);

        content[folderName].externalLinks = externalLinksInWiki;

        console.log(content[folderName].lastEditedBy, content[folderName].lastEditedAt);
        await delay(2000);

        const breadcrumbsLocator = page.locator('ul.v-breadcrumbs');
        const navigateToHome = breadcrumbsLocator.locator('button.mdi-home');

        await navigateToHome.click();
        await delay(2000);
    } catch (error) {
        console.log('Error while Scraping Info', error);
    }
}

async function scrapeFolder(page: Page, folderLocator: Locator, navLocator: Locator, content: Content) {
    const folderName = await folderLocator.innerText();
    const baseUrl = page.url();
    const urlLink = new URL(folderName.toLowerCase(), baseUrl).href;

    folders.push(folderName);

    if (!content[folderName]) {
        content[folderName] = {link: urlLink, subTopics: {}};
    }

    try {
        await folderLocator.click();
        await page.waitForSelector('div[tabindex="0"]:not([style])', {timeout: 10000});
        await delay(1000);

        navLocator = page.locator('div.v-navigation-drawer__content');
        await scrapeLinksInSection(navLocator, content, folderName, baseUrl);

        const subfolders = await navLocator.locator('div[tabindex="0"]:not([style]):not(:has-text("Current Directory"))').all();

        if (subfolders.length === 0) {
            console.log(`No subfolders found in folder: ${folderName}`);
            folders.pop();
            let currentFolder: string | undefined = '';

            if (folders.length === 0) {
                await scrapeInformation(page, folderName, navLocator, content);
            } else {
                currentFolder = folders[folders.length - 1];
            }

            if (currentFolder) {
                const parent = navLocator
                    .locator('div[tabindex="0"]')
                    .filter({hasText: new RegExp(`^${currentFolder}$`)})
                    .nth(0);

                await parent.click();
                await delay(3000);
            }

            return;
        }

        for (const subfolder of subfolders) {
            await scrapeFolder(page, subfolder, navLocator, content[folderName].subTopics);
        }

        if (folders.length > 1) {
            folders.pop();

            const parent = navLocator
                .locator('div[tabindex="0"]')
                .filter({hasText: new RegExp(`^${folders[folders.length-1]}$`)})
                .first();

            await parent.click();
            await delay(3000);

        } else {
            await scrapeInformation(page, folderName, navLocator, content);
            folders.splice(0);
            await delay(3000);
        }

    } catch (error) {
        console.error(`Error in folder "${folderName}":`, error);
    }
}

async function scrapeLinksInSection(sectionLocator: Locator, content: Content, parentFolder: string | null, baseUrl: string) {
    try {
        const links = await sectionLocator.locator('a[tabindex="0"]').all();
        for (const link of links) {
            const text = await link.innerText();
            const href = await link.getAttribute('href');

            const topicLink = new URL(href || '', baseUrl).href;

            if (topicLink && text !== '') {

                if (parentFolder && content[parentFolder]) {
                    content[parentFolder].subTopics[text] = {link: topicLink, subTopics: {}};
                } else {
                    content[text] = {link: topicLink, subTopics: {}};
                }

                console.log(`Scraped: ${text} -> ${topicLink}`);
                await delay(2000);
            }
        }

    } catch (error) {
        console.log('Error During Scraping:', error);
    }
}

async function scrapeNavigationLinks(page: Page) {
    try {
        const content: Content = {};
        const baseUrl = page.url();
        const navLocator = page.locator('div.v-navigation-drawer__content');
        const foldersInNav = await navLocator.locator('div[tabindex="0"]').all();

        await scrapeLinksInSection(navLocator, content, null, baseUrl);

        for (const folder of foldersInNav) {
            const folderName = await folder.innerText();
            const topicLink = new URL(folderName.toLowerCase(), baseUrl).href;

            if (!content[folderName]) {
                content[folderName] = {link: topicLink, subTopics: {}};
            }

            await scrapeFolder(page, folder, navLocator, content);
            await delay(3000);
        }

        return content;
    } catch (error) {
        console.log('Error Facing while Scraping:', error);
    }
}

(async () => {
    const browser = await firefox.launch({headless: false});
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
        const scrapedData = await scrapeNavigationLinks(page);
        console.log(JSON.stringify(scrapedData, null, 2));
    } catch (error) {
        console.log('Error while Scraping:', error);
    }
    await browser.close();
})();
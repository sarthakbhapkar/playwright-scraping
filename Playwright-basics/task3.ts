import {chromium, Locator, Page} from 'playwright';

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const folders: string[] = [];

async function scrapeLinksInSection(sectionLocator: Locator, content: Record<string, any>, parentFolder: string | null, baseUrl: string): Promise<void> {
    const links = await sectionLocator.locator('a[tabindex="0"]').all();
    for (const link of links) {
        const text = await link.innerText();
        const href = await link.getAttribute('href');

        const resolvedHref = new URL(href || '', baseUrl).href;

        if (resolvedHref && text !== '') {
            if (parentFolder && content[parentFolder]) {
                content[parentFolder].subTopics[text] = {link: resolvedHref, subTopics: {}};
            } else {
                content[text] = {link: resolvedHref, subTopics: {}};
            }
            console.log(`Scraped: ${text} -> ${resolvedHref}`);
            await delay(2000);
        }
    }
}

async function scrapeFolder(page: Page, folderLocator: Locator, navLocator: Locator, content: Record<string, any>): Promise<void> {
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
        await delay(3000);

        navLocator = page.locator('div.v-navigation-drawer__content');
        await scrapeLinksInSection(navLocator, content, folderName, baseUrl);

        const subfolders = await navLocator.locator('div[tabindex="0"]:not([style]):not(:has-text("Current Directory"))').all();

        if (subfolders.length === 0) {
            console.log(`No subfolders found in folder: ${folderName}`);
            folders.pop();
            let f: string | undefined = '';
            if (folders.length === 0) {
                f = '/ sidebar.root';
            } else {
                //f = folders.pop();
                f = folders[folders.length - 1];
            }
            if (f) {
                const parent = navLocator
                    .locator('div[tabindex="0"]')
                    .filter({hasText: new RegExp(`^${f}$`)})
                    .nth(0);
                await parent.click();
                await delay(3000);
            }
            return;
        }

        for (const subfolder of subfolders) {
            await scrapeFolder(page, subfolder, navLocator, content[folderName].subTopics);
        }

        if (folders.length > 0) {
            folders.pop();
            if (folders.length > 0) {
                const parent = navLocator
                    .locator('div[tabindex="0"]')
                    .filter({hasText: new RegExp(`^${folders[folders.length-1]}$`)})
                    .nth(0);
                await parent.click();
                await delay(3000);
            } else {
                const root = navLocator.locator('div[tabindex="0"]:has-text("/ sidebar.root")').nth(0);
                await root.click();
                folders.length = 0;
                await delay(3000);
            }

        } else {
            const root = navLocator.locator('div[tabindex="0"]:has-text("/ sidebar.root")').nth(0);
            await root.click();
            folders.length = 0;
            await delay(3000);
        }
    } catch (error) {
        console.error(`Error in folder "${folderName}":`, error);
    }
}

async function scrapeNavigationLinks(page: Page): Promise<Record<string, any>> {
    const content: Record<string, any> = {};
    const baseUrl = page.url();
    let navLocator = page.locator('div.v-navigation-drawer__content');
    const foldersInNav = navLocator.locator('div[tabindex="0"]');
    const folderCount = await foldersInNav.count();
    await scrapeLinksInSection(navLocator, content, null, baseUrl);

    for (let i = 0; i < folderCount; i++) {
        const folder = foldersInNav.nth(i);
        await scrapeFolder(page, folder, navLocator, content);
        await delay(3000);
    }

    return content;
}

(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://wiki.noovosoft.com/login');
    await page.locator('div.login-form input[type="email"]').fill('sarthak.bhapkar@noovosoft.com');
    await page.locator('div.login-form input[type="password"]').fill('Sarthak@30');

    await page.locator('button:has-text("Log In")').click();
    await page.waitForURL('https://wiki.noovosoft.com');

    try {
        const scrapedData = await scrapeNavigationLinks(page);
        console.log("Scraped Data:", scrapedData);
    } catch (error) {
        console.error("An error occurred during scraping:", error);
    } finally {
        await browser.close();
    }
})();




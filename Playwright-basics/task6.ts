import {BrowserContext, chromium, Locator, Page} from 'playwright';

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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
        }
        await delay(1000);
    }
}

async function scrapeFolder(page: Page, folderName: string, navLocator: Locator, content: Record<string, any>, folders: string[]): Promise<void> {
    console.log('FolderName: ', folderName);

    if (!folderName) return;

    const baseUrl = page.url();
    const urlLink = new URL(folderName.toLowerCase(), baseUrl).href;

    await delay(1000);
    folders.push(folderName);

    if (!content[folderName]) {
        content[folderName] = {link: urlLink, subTopics: {}};
    }

    try {

        await delay(3000);

        const folderElements = await navLocator.locator(`div.v-list-item__title:has-text("${folderName}")`).all();

        if (folderElements.length > 1) {
            const selectedElement = folderElements[0];
            await selectedElement.click();
            await delay(2000);
        } else if (folderElements.length === 1) {
            await folderElements[0].click();
            await delay(2000);
        } else {
            console.error(`No element found for folder "${folderName}".`);
            return;
        }

        await page.waitForSelector('div[tabindex="0"]:not([style])', {timeout: 10000});
        await delay(2000);

        await scrapeLinksInSection(navLocator, content, folderName, baseUrl);

        const subfolders = await navLocator.locator('div[tabindex="0"]:not([style]):not(:has-text("Current Directory"))').all();

        if (subfolders.length === 0) {
            console.log(`No subfolders found in folder: ${folderName}`);
            folders.pop();
            let f: string | undefined = '';
            if (folders.length === 0) {
                f = '/ (root)';
            } else {
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
            const subFolderText = await subfolder.innerText();
            await scrapeFolder(page, subFolderText, navLocator, content[folderName].subTopics, folders);
            await delay(3000);
        }

        if (folders.length > 1) {
            folders.pop();
            const parent = navLocator
                .locator('div[tabindex="0"]')
                .filter({hasText: new RegExp(`^${folders[folders.length - 1]}$`)})
                .nth(0);
            await parent.click();
            await delay(3000);
        } else {
            try {
                const root = navLocator.locator('div[tabindex="0"]:has-text("/ sidebar.root")').first();
                await root.click();
            } catch {
                const root = navLocator.locator('div[tabindex="0"]:has-text("/ (root)")').first();
                await root.click();
            }
            folders.length = 0;
            await delay(3000);
        }

    } catch (error) {
        console.error(`Error in folder "${folderName}":`, error);
    }
}

async function scrapeNavigationLinks(context: BrowserContext, page: Page): Promise<Record<string, any>> {
    const content: Record<string, any> = {};
    const baseUrl = page.url();
    const navLocator = page.locator('div.v-navigation-drawer__content');
    const foldersInNav = await navLocator.locator('div[tabindex="0"]').all();

    const folderScrapingPromises = foldersInNav.map(async (folder) => {
        const folderName = await folder.innerText();
        const newPage = await context.newPage();

        try {
            await newPage.goto(baseUrl);
            const newNavLocator = newPage.locator('div.v-navigation-drawer__content');
            await scrapeFolder(newPage, folderName, newNavLocator, content, []);
            await delay(2000);
        } catch (error) {
            console.error(`Error scraping folder "${folderName}":`, error);
        } finally {
            await newPage.close();
        }
    });

    await Promise.all(folderScrapingPromises);

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
        const scrapedData = await scrapeNavigationLinks(context, page);
        console.log("Scraped Data:", JSON.stringify(scrapedData, null, 2));
    } catch (error) {
        console.error("An error occurred during scraping:", error);
    } finally {
        await browser.close();
    }
})();

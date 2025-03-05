import { chromium } from 'playwright';
(async () => {
    console.log('Starting playwright...');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.zoho.com/')
    await page.click('text=Sign In')
    await page.fill('#login_id','sarthak.bhapkar@noovosoft.com')
    await page.click('text=Next')
    await page.waitForSelector('#password')
    await page.fill('#password','abc@123')
    await page.click('#nextbtn')
    await page.mouse.wheel(0, 1000);

    await page.goto('https://www.cricbuzz.com/');

    await page.goto('https://in.bookmyshow.com/explore/home/pune');

    const ans = await page.click('text=Sign in');
    console.log(ans);
    await page.fill('#mobileNo', '9359125523');
    await page.click('text=Continue');

    // const h1Count = await page.$$('h1');
    // console.log(`Number of <h1> elements: ${h1Count.length}`);

    const heading = await page.$$eval('.sc-133848s-3.sc-133848s-10.dOuCBq', elements =>
        elements.map(el => el.textContent).join(',')
    );
    console.log(heading);

    await page.fill('input[type="email"]', 'sarthakbhapkar45@gmail.com');
    await page.click('text=Next');

    // const heading= await page.textContent('h1');
    // const heading = await page.$$eval('h1', elements => elements.map(el => el.textContent).join(','));
    // console.log(heading);

    await page.click('text= Live Scores');
    await page.waitForSelector('body');

    await page.screenshot({path: `${__dirname}/screenshot.png`});

    console.log(await page.title());

    await page.route('**/*.jpg',(route)=>{
        console.log('Blocked image:', route.request().url());
        route.abort();
    })

    await browser.close();
})();


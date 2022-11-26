const puppeteer = require('puppeteer');

const product_url = "website";

async function givePage() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    return page;
}

async function addToCart(page) {
    await page.goto(product_url);
    await page.waitForSelector("add to cart button id");
    await page.click("add to cart button id", elem => elem.click());
    await page.waitForNavigation();
    await page.click("checkout button id", elem => elem.click());
    await page.waitFor(1000);
    await page.click("checkout as guest button id", elem => elem.click());
}

async function billingInfo() {
    await page.waitFor(1000);
    await page.type("first name text box id", 'Anderson');
    await page.waitFor(100);
    await page.type("last name text box id", 'Lee');
    await page.waitFor(100);
    await page.type("address line text box id", '674 ridgewood lane');
    await page.waitFor(100);
    await page.type("phone number text box id", '5548920239')
    await page.waitFor(100);
    await page.type("email text box id", 'andlee523@gmail.com');
    const inputCity = await page.$("city text box id"); //in case anything is autofilled this can be used
    await inputCity.click({clickCount: 3});
    await inputCity.type('La Puente');
    await page.waitFor(100);
    const inputZip = await page.$("city text box id"); //in case zip is autofilled
    await inputZip.click({clickCount: 3});
    await inputZip.type('91744');
    await page.waitFor(100);
    await page.click("continue button id", elem => elem.click());
}

async function paymentInfo(page) {
    await page.waitFor(1000);
    await page.type("credit text box id", '8923 7812 8321 3845');
    await page.waitFor(100);
    await page.type("CVV text box id", '591');
    await page.waitFor(100);
    await page.select("month drop-down id", '08');
    await page.waitFor(100);
    await page.select("year drop-down id", '2025');
    await page.waitFor(100);
    await page.click("review order button id", elem => elem.click());
    await page.waitFor(1000);
    await page.click("place order button id", elem => elem.click());
}

async function checkout() {
    var page = await givePage();
    await addToCart(page);
    await billingInfo(page);
    await paymentInfo(page);
}

checkout();
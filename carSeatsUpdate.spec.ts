import { chromium } from 'playwright';

(async () => {
  let browser;

  try {
    // Launch browser
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the website
    await page.goto('https://suri.cz'); 
    console.log('Page loaded successfully');

    // Click the "Reject Cookies" button
    await page.waitForSelector('#cookiescript_reject');
    await page.click('#cookiescript_reject');
    console.log('Cookies rejected');

    // Fill in the SPZ (registration plate) field
    await page.fill('#regPlate', '9AR0175');
    console.log('SPZ filled');

    // Submit the form
    await page.waitForSelector('[data-testid="car-calculator-cta-desktop"]');
    await page.click('[data-testid="car-calculator-cta-desktop"]');
    await page.waitForSelector('text=Vaše vozidlo')
    console.log('Form submitted and checked');

    // Wait for the "Úprava vozidla" button and click it
    await page.waitForSelector('xpath=//button[@id="button.show.policyHolder"]');
    await page.click('xpath=//button[@id="button.show.policyHolder"]');
    console.log('Policy Holder button clicked');

    // Wait for the seats input and scroll to it
    await page.waitForSelector('#seats');
    await page.locator('#seats').scrollIntoViewIfNeeded();
    console.log('Seats input visible');

    // Fill seats input with the desired value
    await page.screenshot({ path: 'screenshot1.png' });
    await page.fill('#seats', '6');
    await page.screenshot({ path: 'screenshot2.png' });
    console.log('Seats input updated to 6');
    // Select modal option
    await page.waitForSelector('xpath=//button[@id="modal.select"]', { state: 'visible' });
    await page.click('xpath=//button[@id="modal.select"]');
    console.log('Modal option selected');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('Error during the automation process:', error);
  } finally {
    // Close the browser
    if (browser) {
      await browser.close();
      console.log('Browser closed');
    }
  }
})();

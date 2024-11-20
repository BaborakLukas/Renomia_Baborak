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

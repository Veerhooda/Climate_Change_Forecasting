const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function testDashboard() {
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.error('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  // 1. Scroll to Act 4 to reveal "Initiate observation"
  console.log('Scrolling down to Act 4...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1200));

  // 2. Click "Initiate observation"
  console.log('Clicking Initiate observation button...');
  const initiateBtn = await page.$('#cta-initiate-forecast');
  if (!initiateBtn) {
    throw new Error('Could not find #cta-initiate-forecast button!');
  }
  await initiateBtn.click();
  await new Promise((r) => setTimeout(r, 1200));

  // 3. Capture Observation Dashboard - Main Map View
  console.log('Capturing dashboard_01_map.png...');
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard_01_map.png') });

  // 4. Click API nav
  console.log('Testing API subscreen...');
  await page.click('#nav-api');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard_02_api.png') });

  // 5. Click Forecast nav
  console.log('Testing Forecast subscreen...');
  await page.click('#nav-forecast');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard_03_forecast.png') });

  // 6. Click Climate Monitor nav
  console.log('Testing Climate Monitor subscreen...');
  await page.click('#nav-monitor');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard_04_monitor.png') });

  // 7. Click Data Coverage nav
  console.log('Testing Data Coverage subscreen...');
  await page.click('#nav-coverage');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard_05_coverage.png') });

  // 8. Click Methodology nav
  console.log('Testing Methodology subscreen...');
  await page.click('#nav-methodology');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard_06_methodology.png') });

  // 9. Back to Map, search country "France" to test search and country details drawer
  console.log('Returning to Map and testing search...');
  await page.click('#nav-map');
  await new Promise((r) => setTimeout(r, 500));

  await page.type('.search-input', 'France');
  await new Promise((r) => setTimeout(r, 400));
  const firstDropdownItem = await page.$('.search-dropdown-item');
  if (firstDropdownItem) {
    await firstDropdownItem.click();
    await new Promise((r) => setTimeout(r, 600));
  }
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard_07_country_details.png') });

  // 10. Click Create Account
  console.log('Testing Create Account modal...');
  await page.click('#btn-create-account');
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotsDir, 'dashboard_08_create_account_modal.png') });

  console.log('All dashboard tests completed successfully!');
  await browser.close();
}

testDashboard().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

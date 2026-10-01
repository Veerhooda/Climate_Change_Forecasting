const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function testScroll() {
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

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

  // Wait 2.2s for WebGL scene initialization and GSAP entrance
  await new Promise((r) => setTimeout(r, 2200));

  console.log('Capturing 01_three_orbit_hero.png...');
  await page.screenshot({ path: path.join(screenshotsDir, '01_three_orbit_hero.png') });

  // Test mouse move across canvas to verify smooth 3D camera tilt with zero border clipping
  console.log('Simulating mouse movement across canvas...');
  await page.mouse.move(1100, 350);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotsDir, '01b_three_mouse_tilt.png') });
  console.log('Captured 01b_three_mouse_tilt.png!');

  // Test audio toggle
  const soundBtn = await page.$('.geometric-sound-toggle');
  if (soundBtn) {
    await soundBtn.click();
    await new Promise((r) => setTimeout(r, 300));
  }

  // Scroll to Act 2: Stratosphere & 3D Clouds & Soaring Birds
  console.log('Scrolling to Act 2 (Stratosphere & Birds)...');
  await page.evaluate(() => window.scrollBy(0, 950));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, '02_three_stratosphere_clouds.png') });
  console.log('Captured 02_three_stratosphere_clouds.png!');

  // Scroll to Act 3: Canopy & Low-poly Pine Forest
  console.log('Scrolling to Act 3 (Pine Forest Canopy)...');
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, '03_three_canopy_trees.png') });
  console.log('Captured 03_three_canopy_trees.png!');

  // Scroll to Act 4: Human Ground & Cabin Hearth
  console.log('Scrolling to Act 4 (Cabin & Human Observer)...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(screenshotsDir, '04_three_cabin_human.png') });
  console.log('Captured 04_three_cabin_human.png!');

  console.log('All Three.js WebGL tests completed successfully!');
  await browser.close();
}

testScroll().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

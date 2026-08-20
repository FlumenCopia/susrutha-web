const puppeteer = require('puppeteer-core');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/treatments/elakizhi', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.treatment-tab-link'));
    const processTab = links.find(l => l.textContent.includes('Treatment Process'));
    if (processTab) processTab.click();
  });

  await new Promise(r => setTimeout(r, 500));

  const imgPath = 'C:\\Users\\MiscArchive\\.gemini\\antigravity-ide\\brain\\41ee69ad-0f48-4819-b8e7-8c3e157b99b4\\detail_tab_fixed_preview.png';
  await page.screenshot({ path: imgPath });
  console.log('Saved detail tab fixed screenshot:', imgPath);

  await browser.close();
}

main().catch(console.error);

const puppeteer = require('puppeteer-core');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/conditions', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const imgPath = 'C:\\Users\\MiscArchive\\.gemini\\antigravity-ide\\brain\\41ee69ad-0f48-4819-b8e7-8c3e157b99b4\\conditions_image_fixed_preview.png';
  await page.screenshot({ path: imgPath });
  console.log('Saved conditions image fixed screenshot:', imgPath);

  await browser.close();
}

main().catch(console.error);

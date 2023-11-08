import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

export const coles = async () => {
	puppeteer.use(stealth());

	const browser = await puppeteer.launch({
		headless: true,
		// Linux/Ubuntu
		// executablePath: '/usr/bin/chromium-browser',
		// args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	const auPage = await browser.newPage();
	console.log('Launching...');
	await auPage.goto('https://www.coles.com.au/search?q=up+and+go');

	const content = await auPage.content();
	if (content.includes('<meta itemprop="availability" content="https://schema.org/OutOfStock">')) {
		const title = await auPage.title();
		console.log(`[AU - ${time}] ${title}\n   - Still out of stock.`);
	}

	return <p>{results}</p>;
};

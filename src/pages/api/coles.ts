import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

type ResponseData = {
	content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const { query } = req.query;

	puppeteer.use(stealth());

	const browser = await puppeteer.launch({
		headless: false,
	});

	const auPage = await browser.newPage();
	await auPage.goto(`https://www.coles.com.au/search?q=${query}`);

	const content = await auPage.content();

	res.status(200).json({ content });
}

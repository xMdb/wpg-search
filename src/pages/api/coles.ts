import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

type ResponseData = {
	name: string | null;
	price: string | null;
	pricePerUnit: string | null;
	image: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const { query } = req.query;
	if (!query) {
		return res.status(400).json({ content: 'Error: You must provide a query using ?query=' });
	}

	if (req.method !== 'GET') {
		return res.status(400).json({ content: 'Error: Request type must be GET' });
	}

	puppeteer.use(stealth());

	const browser = await puppeteer.launch({
		headless: false,
	});

	const auPage = await browser.newPage();
	await auPage.goto(`https://www.coles.com.au/search?q=${query}`);

	const content = await auPage.content();

	// Function to extract product information from HTML string
	function extractProductInfoFromHTML(htmlCode: string) {
		// Regular expressions to extract information
		const nameRegex = /<span class="product__title">(.*?)<\/span>/;
		const priceRegex = /<span class="price__value">(.*?)<\/span>/;
		const pricePerUnitRegex = /<span class="price__calculation_method">(.*?)<\/span>/;
		const imageRegex = /<img.*?src="(.*?)".*?data-testid="product-image".*?>/;

		// Extracting information using regular expressions
		const nameMatch = htmlCode.match(nameRegex);
		const productName = nameMatch ? nameMatch[1].trim() : null;

		const priceMatch = htmlCode.match(priceRegex);
		const productPrice = priceMatch ? priceMatch[1].trim() : null;

		const pricePerUnitMatch = htmlCode.match(pricePerUnitRegex);
		const pricePerUnit = pricePerUnitMatch ? pricePerUnitMatch[1].trim() : null;

		const imageMatch = htmlCode.match(imageRegex);
		const productImage = imageMatch ? imageMatch[1] : null;

		// Creating an object to store the extracted information
		const productInfo = {
			name: productName,
			price: productPrice,
			pricePerUnit: pricePerUnit,
			image: productImage,
		};

		return productInfo;
	}
	const productInfo = extractProductInfoFromHTML(content);

	res.status(200).json(productInfo);
}

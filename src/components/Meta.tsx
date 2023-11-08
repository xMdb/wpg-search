import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const Meta = () => {
	const router = useRouter();
	return (
		<>
			<Head>
				<meta charSet="UTF-8" key="charset" />
				<meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
				<link rel="icon" href={`${router.basePath}/favicon.ico`} key="favicon" />
				<NextSeo
					title="Which Price Gouger?"
					description="A tool to compare prices of products from Australian supermarkets to find the cheapest one without the bloat."
					canonical="https://which-price-gouger.vercel.app/"
					openGraph={{
						title: 'Which Price Gouger?',
						description:
							'A tool to compare prices of products from Australian supermarkets to find the cheapest one without the bloat.',
					}}
				/>
			</Head>
		</>
	);
};

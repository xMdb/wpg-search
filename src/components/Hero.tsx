import { Box } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type Content = {
	content: string;
};

export const getServerSideProps: GetServerSideProps<Content> = async (context) => {
	const { query } = context.query;
	const res = await fetch(`/api/coles?query=${query}`);
	const data = await res.json();

	return { props: { content: data.content } };
};

export const Hero: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ content }) => {
	return (
		<Box height={['60vh', '90vh']} id="hero">
			<h1>Hero</h1>
			<h1>Hero</h1>
			<h1>Hero</h1>
			<h1>Hero</h1>
			<p>{content}</p>
		</Box>
	);
};

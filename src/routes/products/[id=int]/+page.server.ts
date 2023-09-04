import { error } from '@sveltejs/kit';

type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
};

type Comment = {
	comments: {
		body: string;
	}[];
};

export const load = async ({ params: { id }, fetch }) => {
	const response = await fetch(`https://dummyjson.com/products/${id}`);

	if (response.ok) {
		const product: Product = await response.json();

		const comments: Promise<Comment> = fetch(`https://dummyjson.com/comments`).then((res) =>
			res.json()
		);

		return {
			product,
			title: product.title,
			description: product.description,

			nested: {
				// this wont be awaited, will be streamed in
				comments
			}
		};
	}

	throw error(response.status, response.statusText);
};

// if `crawl` found the page, it will pre-render,
// else it will SSR
export const prerender = 'auto';

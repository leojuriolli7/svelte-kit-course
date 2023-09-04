import { error, json } from '@sveltejs/kit';

export const GET = async ({ fetch }) => {
	const response = await fetch('https://dummyjson.com/products');

	if (response.ok) {
		const products = await response.json();
		return json(products, { status: 200 });
	}

	throw error(response.status, response.statusText);
};

// POST requests cannot be pre-rendered
// export const POST = async ({ request }) => {
// 	const product = await request.json();

// 	if (!product.title) {
// 		throw error(400, 'Product title is required');
// 	}

// 	return json({ id: 999, title: product.title });
// };

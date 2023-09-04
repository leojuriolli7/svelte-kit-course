import { error } from '@sveltejs/kit';

export const load = async ({ fetch, locals }) => {
	const response = await fetch('/api/products');

	if (response.ok) {
		return { products: await response.json() };
	}

	const errorObject = await response.json();
	throw error(response.status, errorObject.message);
};

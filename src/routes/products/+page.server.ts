import { error } from '@sveltejs/kit';
// import { API_KEY } from '$env/static/private';
// import { env } from '$env/dynamic/private';

export const load = async ({ fetch, locals }) => {
	const response = await fetch('/api/products');

	// evaluated at build time
	// console.log(API_KEY);

	// evaluated at run time
	// console.log(env.API_KEY)

	if (response.ok) {
		return { products: await response.json() };
	}

	const errorObject = await response.json();
	throw error(response.status, errorObject.message);
};

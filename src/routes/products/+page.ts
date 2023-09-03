export const load = ({ data }) => {
	return {
		products: data.products,
		title: 'Products List',
		description: 'List of all products.'
	};
};

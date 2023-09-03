export const load = ({ cookies }) => {
	const token = cookies.get('token');

	// get the user with the token
	const user = { name: 'John', id: 1 };

	return {
		user: token ? user : null
	};
};

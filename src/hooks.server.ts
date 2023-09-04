export const handle = async ({ event, resolve }) => {
	const { locals, cookies } = event;

	const token = cookies.get('token');

	locals.user = token ? { name: 'John', id: 1 } : null;

	const response = await resolve(event);

	return response;
};

export const handleFetch = ({ request, event, fetch }) => {
	if (request.url.startsWith('https://dummyjson.com/')) {
		const { cookies } = event;
		const cookie = cookies.get('cookie');

		if (cookie) {
			request.headers.set('New Header', cookie);
		}

		return fetch(request);
	}
};

export const handle = async ({ event, resolve }) => {
	const { locals, cookies } = event;

	const token = cookies.get('token');

	locals.user = token ? { name: 'John', id: 1 } : null;

	const response = await resolve(event);

	return response;
};

export const handleFetch = ({ request, event, fetch }) => {
	if (request.url.startsWith('https://dummyjson.com/')) {
		const cookie = event.request.headers.get('cookie');
		if (cookie) {
			request.headers.set('cookie', cookie);
		}
	}
	return fetch(request);
};

export const handleError = ({ error, event }) => {
	console.log('error, event:', error, event);
	return {
		// this will be the error message
		message: 'An unexpected error occurred',
		code: 'INTERNAL_ERROR'
	};
};

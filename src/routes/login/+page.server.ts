import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		if (!username) {
			return fail(400, { usernameMissing: true, password });
		}

		if (!password) {
			return fail(400, { passwordMissing: true, username });
		}

		cookies.set('token', 'token_value', {
			path: '/'
		});

		const routeToRedirect = url.searchParams.get('redirectTo') || '/';

		throw redirect(303, routeToRedirect);
	},
	logout: ({ cookies, url }) => {
		const routeToRedirect = url.searchParams.get('redirectTo') || '/';
		cookies.delete('token', { path: '/' });

		throw redirect(303, routeToRedirect);
	}
};

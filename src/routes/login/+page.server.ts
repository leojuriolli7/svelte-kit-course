import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies, url, locals }) => {
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

		// it is not guaranteed that when this action runs,
		// the handle hook will be called or not
		locals.user = { name: 'John', id: 1 };

		throw redirect(303, routeToRedirect);
	},
	logout: ({ cookies, url, locals }) => {
		const routeToRedirect = url.searchParams.get('redirectTo') || '/';
		cookies.delete('token', { path: '/' });

		locals.user = null;
		throw redirect(303, routeToRedirect);
	}
};

import { json } from '@sveltejs/kit';

export const POST = ({ cookies }) => {
	cookies.delete('token', { path: '/' });

	return json({
		success: true
	});
};

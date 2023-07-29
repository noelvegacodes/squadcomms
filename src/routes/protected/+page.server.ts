import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	const { session } = locals;

	if (!session) {
		throw redirect(302, '/signup');
	}

	return { session };
};

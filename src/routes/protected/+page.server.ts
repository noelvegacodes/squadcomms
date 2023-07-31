import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	const { accountSession } = locals;

	if (!accountSession) {
		throw redirect(302, '/signup');
	}

	return { accountSession };
};

// routes/+page.server.ts
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = locals.auth.validate();
	if (!session) throw redirect(302, '/signin');
	throw redirect(302, '/profile');
};

export const actions = {
	logout: async ({ locals }) => {
		const session = locals.session;
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/signin'); // redirect to login page
	}
};

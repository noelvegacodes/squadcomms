// routes/+page.server.ts
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = locals.auth.validate();

	return { session };
};

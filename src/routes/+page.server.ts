import type { Actions } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = locals.session;

	return { session };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		return {};
	}
};

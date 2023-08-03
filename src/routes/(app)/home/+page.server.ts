import { AccountsTable, UsersTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ locals, route }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	// const data = await db
	// 	.select()
	// 	.from(AccountsTable)
	// 	.fullJoin(UsersTable, eq(UsersTable.id, AccountsTable.id));

	// console.log(data);
};

export const actions = {
	default: async ({ locals, route }) => {}
};

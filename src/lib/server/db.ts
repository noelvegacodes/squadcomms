import { drizzle } from 'drizzle-orm/neon-http';
import { eq, or } from 'drizzle-orm';
import { PRIVATE_DATABASE_URL } from '$env/static/private';
import { neon, neonConfig } from '@neondatabase/serverless';
import { AccountsTable, type AccountType } from './schema';
const sql = neon(PRIVATE_DATABASE_URL);
neonConfig.fetchConnectionCache = true;
export const db = drizzle(sql);

import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export async function helloWorld() {
	const start = new Date() as any;
	const [dbResponse] = await sql`SELECT NOW()`;
	const now = dbResponse.now;
	const end = new Date() as any;
	return { now, latency: Math.abs(end - start) };
}

export async function createAccount({
	email,
	handle,
	password
}: {
	password: string;
	email: string;
	handle: string;
}) {
	try {
		const salt = genSaltSync(10);
		const hashedPassword = hashSync(password, salt);
		return (
			await db.insert(AccountsTable).values({ email, handle, hashedPassword }).returning({
				id: AccountsTable.id,
				handle: AccountsTable.handle,
				email: AccountsTable.email,
				createdAt: AccountsTable.createdAt,
				updatedAt: AccountsTable.updatedAt
			})
		)[0];
	} catch {
		throw new Error('server error: unable to create account');
	}
}

export async function findAccount(
	email: string,
	handle: string = ''
): Promise<Omit<AccountType, 'hashedPassword'> | undefined> {
	console.log(email, handle);
	try {
		const account = await db
			.select({
				id: AccountsTable.id,
				handle: AccountsTable.handle,
				email: AccountsTable.email,
				createdAt: AccountsTable.createdAt,
				updatedAt: AccountsTable.updatedAt
			})
			.from(AccountsTable)
			.where(or(eq(AccountsTable.email, email), eq(AccountsTable.handle, handle)));
		return account[0];
	} catch {
		throw new Error('server error: unable to find account');
	}
}

export async function authenticateAccount(email: string, password: string) {
	try {
		const foundAccount = (
			await db.select().from(AccountsTable).where(eq(AccountsTable.email, email))
		)[0];

		if (!foundAccount) {
			return undefined;
		}
		const { hashedPassword, ...account } = foundAccount;
		const isAuthenticated = compareSync(password, hashedPassword);

		return isAuthenticated ? account : undefined;
	} catch {
		throw new Error('server error: unable to authenticate account');
	}
}

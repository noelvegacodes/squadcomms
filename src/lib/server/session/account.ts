import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { AccountsTable, type AccountType } from '../schema';
import { db } from '../db';
import { eq, or } from 'drizzle-orm';
import type { Cookies } from '@sveltejs/kit';
import type { AccountWithoutPassword } from '$lib/types';
import { session } from '.';

const accountSessionKey = 'acc_session_id';
const passwordResetSessionKey = 'pr_session_id';

export const account = {
	get: accountWithoutPassword,
	create: createAccount,
	authenticate: authenticateAccount,
	session: {
		get: getAccountSession,
		create: createAccountSession,
		destory: destroyAccountSession
	}
};

account.create;

export const passwordReset = {
	session: {
		get: getPasswordResetSession,
		create: createPasswordResetSession,
		destroy: destroyPasswordResetSession
	},
	updatePassword
};

async function createAccount({
	email,
	handle,
	password
}: {
	password: string;
	email: string;
	handle: string;
}) {
	try {
		const existingAccount = await accountWithoutPassword(email, handle);

		if (existingAccount) {
			throw Error('user already exists');
		}
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

async function accountWithoutPassword(
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

async function authenticateAccount(email: string, password: string) {
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

async function getAccountSession(cookies: Cookies) {
	return await session.get<AccountWithoutPassword>(accountSessionKey, cookies);
}

async function createAccountSession(account: AccountWithoutPassword, cookies: Cookies) {
	const weekInSeconds = 60 * 60 * 24 * 7;
	return await session.create<AccountWithoutPassword>({
		key: accountSessionKey,
		seconds: weekInSeconds,
		cookies: cookies,
		data: account
	});
}

async function destroyAccountSession(cookies: Cookies) {
	console.log('destroying account session');
	await session.destroy(accountSessionKey, cookies);
}

async function createPasswordResetSession(accountId: number, cookies: Cookies) {
	return await session.create({
		key: passwordResetSessionKey,
		seconds: 60 * 5,
		cookies,
		data: { accountId }
	});
}

async function getPasswordResetSession(cookies: Cookies) {
	return await session.get<{ data: { accountId: number } }>(passwordResetSessionKey, cookies);
}

async function destroyPasswordResetSession(cookies: Cookies) {
	await session.destroy(passwordResetSessionKey, cookies);
}

async function updatePassword(accountId: number, password: string) {
	const salt = genSaltSync(10);
	const hashedPassword = hashSync(password, salt);

	try {
		await db.update(AccountsTable).set({ hashedPassword }).where(eq(AccountsTable.id, accountId));
	} catch {
		throw new Error('server error: unable to update password');
	}
}

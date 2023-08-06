import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import { db } from './db';
import { emailVerificationTokens, passwordResetTokens } from './db/schema';
import { eq } from 'drizzle-orm';

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (user_id: string) => {
	const storedUserTokens = await db
		.select()
		.from(emailVerificationTokens)
		.where(eq(emailVerificationTokens.user_id, user_id));

	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db
		.insert(emailVerificationTokens)
		.values({ id: token, expires: new Date().getTime() + EXPIRES_IN, user_id });

	return token;
};

export const validateEmailVerificationToken = async (token: string) => {
	const storedToken = await db.transaction(async (tx) => {
		const storedToken = (
			await tx.select().from(emailVerificationTokens).where(eq(emailVerificationTokens.id, token))
		)[0];
		if (!storedToken) throw new Error('Invalid token');
		await tx
			.delete(emailVerificationTokens)
			.where(eq(emailVerificationTokens.user_id, storedToken.user_id));
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.user_id;
};

// $lib/server/token.ts

export const generatePasswordResetToken = async (user_id: string) => {
	const storedUserToken = (
		await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.user_id, user_id))
	)[0];

	if (storedUserToken) {
		const reusableStoredToken = isWithinExpiration(storedUserToken.expires - EXPIRES_IN / 2)
			? storedUserToken
			: null;
		// check if expiration is within 1 hour
		// and reuse the token if true

		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);

	await db
		.insert(passwordResetTokens)
		.values({ id: token, expires: new Date().getTime() + EXPIRES_IN, user_id });
	return token;
};

export const validatePasswordResetToken = async (token: string) => {
	const storedToken = await db.transaction(async (tx) => {
		const storedToken = (
			await tx.select().from(passwordResetTokens).where(eq(passwordResetTokens.id, token))
		)[0];
		if (!storedToken) throw new Error('Invalid token');
		await tx.delete(passwordResetTokens).where(eq(passwordResetTokens.id, storedToken.id));
		return storedToken;
	});
	const tokenExpires = storedToken.expires; // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return storedToken.user_id;
};

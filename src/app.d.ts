// src/app.d.ts

import type { AccountType } from '$lib/server/schema';
import { AccountSession } from '$lib/types';

declare global {
	namespace App {
		interface Locals {
			accountSession: AccountSession;
			passwordResetSession: {
				data: { accountId: number };
			} & {
				sessionExpiry: number;
			};
		}
		interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
export {};

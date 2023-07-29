// src/app.d.ts

import type { AccountType } from '$lib/server/schema';
import { Session } from '$lib/types';

declare global {
	namespace App {
		interface Locals {
			session: Session;
		}
		interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
export {};

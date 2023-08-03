// src/app.d.ts

import type { AccountType } from '$lib/server/db/schema';
import { session } from '$lib/types';

/// <reference types="lucia" />
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		interface PageData {}
	}
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		// type DatabaseUserAttributes = {
		// 	email: string;
		// 	handle: string;
		// 	name: string;
		// };
		// type DatabaseSessionAttributes = {
		// 	email: string;
		// 	handle: string;
		// 	name: string;
		// };
	}
}

export {};

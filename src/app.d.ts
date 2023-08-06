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
		type DatabaseUserAttributes = {
			email: string;
			email_verified: boolean;
			handle: string;
			name: string;
			avatar: string | null;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};

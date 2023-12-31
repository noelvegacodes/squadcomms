// src/app.d.ts

import type { AccountType } from '$lib/server/db/schema';
import { session } from '$lib/types';
import type { Session } from 'lucia';

/// <reference types="lucia" />
declare global {
	namespace App {
		interface Error {
			message: string;
		}
		interface Locals {
			auth: import('lucia').AuthRequest;
			session: Session;
		}
		interface PageData {
			flash?: { type: 'success' | 'error' | 'emailVerification'; message: string };
		}
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

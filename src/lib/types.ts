import type { AccountType } from './server/db/schema';

export type Task = {
	id: string;
	listId: string;
	name: string;
	description: string;
	notification: number;
};

export type List = {
	id: string;
	name: string;
	items: Task[];
};

export type AccountWithoutPassword = Omit<AccountType, 'hashedPassword'>;

export interface Session {
	data: Record<number | string, any>;
	expiry: number;
}

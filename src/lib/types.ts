import type { AccountType } from './server/schema';

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

export type Session = {
	account: AccountWithoutPassword;
	expireAt: number;
};

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

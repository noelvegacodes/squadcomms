export type Task = {
	id: string;
	name: string;
	description: string;
	notification: number;
};

export type List = {
	id: string;
	name: string;
	items: Task[];
};

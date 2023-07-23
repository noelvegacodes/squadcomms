import type { List, Task } from '$lib/types';

import { writable, type Writable } from 'svelte/store';

export const lists: Writable<List[]> = writable([]);

export const addList = (name: string) => {
	const id = crypto.randomUUID();
	lists.update((prev) => [...prev, { id, name, items: [] }]);
};

export const addTask = ({ listId, name }: { listId: string; name: string }) => {
	const id = crypto.randomUUID();
	lists.update((prev) => {
		return prev.map((list) => {
			if (list.id !== listId) {
				return list;
			}

			list.items.push({ id, name, description: '', notification: 0 });
			return list;
		});
	});
};

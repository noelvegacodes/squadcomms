import { createDebounce } from '$lib/debounce';
import { writable } from 'svelte/store';

// async function search() {
// 	searchedFor = value;
// 	if (!value.trim()) {
// 		results = [];
// 		return;
// 	}
// 	const response = await fetch('/stage?search=' + value);
// 	const data = await response.json();
// 	results = data;
// }

// function startSearch() {
// 	debounce(() => search(), 750);
// }

type Config = {
	ms: number;
};

export function createSearch<R>(initial: R, cb: (value: any) => Promise<R>, ms: number = 500) {
	const results = writable<R>(initial);
	const term = writable<string>('');
	const isLoading = writable<boolean>(false);

	function search(node: HTMLInputElement) {
		const debounce = createDebounce();

		function search() {
			term.set(node.value);
			debounce(async () => {
				if (!node.value.trim()) {
					isLoading.set(false);
					results.set(await cb(node.value));
					return;
				}
				isLoading.set(true);
				results.set(await cb(node.value));
				isLoading.set(false);
			}, ms);
		}

		node.addEventListener('keyup', search);

		return {
			destroy: () => {
				node.removeEventListener('keyup', search);
			}
		};
	}

	const clear = term.set('');
	return { results, term, clear, isLoading, search };
}

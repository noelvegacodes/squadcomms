import { writable } from 'svelte/store';

export function createFocus() {
	const isFocused = writable(false);

	const focus = (node: Node) => {
		const isFocus = (e: any) => isFocused.set(true);
		const isBlur = (e: any) => isFocused.set(false);

		node.addEventListener('focus', isFocus);
		node.addEventListener('blur', isBlur);

		return {
			destroy: () => {
				node.removeEventListener('focus', isFocus);
				node.removeEventListener('blur', isFocus);
			}
		};
	};

	return { isFocused, focus };
}

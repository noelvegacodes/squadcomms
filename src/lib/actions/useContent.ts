import { writable } from 'svelte/store';

export function createContent() {
	const active = writable(false);

	const content = (node: Node) => {
		function clickOff() {
			active.set(false);
		}
		function stopPropagation(e: Event) {
			active.set(true);
			e.stopPropagation();
		}

		window.addEventListener('click', clickOff);
		node.addEventListener('click', stopPropagation);

		return {
			destroy: () => {
				node.removeEventListener('click', stopPropagation);
				window.removeEventListener('click', clickOff);
			}
		};
	};

	return { active, content };
}

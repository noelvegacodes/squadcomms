export function createDebounce() {
	let timer: NodeJS.Timeout;

	const debounce = (cb: () => void, ms: number) => {
		clearTimeout(timer);
		timer = setTimeout(cb, ms);
	};

	return debounce;
}

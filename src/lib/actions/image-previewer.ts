import { writable } from 'svelte/store';

export function createImagePreviewer(initialSrc: string | null) {
	const src = writable(initialSrc);

	const previewImage = (node: HTMLInputElement) => {
		function previewLocalImage() {
			if (!node.files) return;
			const file = node.files[0];

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				if (!reader.result || typeof reader.result !== 'string') return;

				src.set(reader.result);
			};
		}

		node.addEventListener('input', previewLocalImage);

		return {
			destroy: () => {
				node.removeEventListener('input', previewLocalImage);
			}
		};
	};

	return { src, previewImage };
}

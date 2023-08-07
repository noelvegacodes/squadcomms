<script>
	import '../app.postcss';
	import './styles.css';
	import { getFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';
	import toast, { Toaster } from 'svelte-french-toast';

	const flash = getFlash(page);


	flash.subscribe(($flash) => {
	if (!$flash) return;

	toast($flash.message, {
		icon: $flash.type == 'success' ? '✅' : '❌', className: "bg-white", position: "bottom-right"
	});

	// Clearing the flash message could sometimes
	// be required here to avoid double-toasting.
	flash.set(undefined);
	});
</script>
<Toaster />
<slot />

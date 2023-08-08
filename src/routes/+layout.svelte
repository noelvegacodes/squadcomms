<script lang="ts">
	import '../app.postcss';
	import './styles.css';
	import {enhance} from '$app/forms'
	import { getFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { createDialog } from '@melt-ui/svelte';
	const { overlay, content, title, trigger, close, open,  portal} = createDialog({closeOnEscape: true})
	const flash = getFlash(page);

	let searchInput: HTMLInputElement

	flash.subscribe(($flash) => {
		if (!$flash) return;

		toast.push({
			msg: $flash.message,
			duration: 10000
		
		})

	// Clearing the flash message could sometimes
	// be required here to avoid double-toasting.
	flash.set(undefined);
	});
</script>

<SvelteToast />
<svelte:window on:keydown={(e) => {
	
	if(e.ctrlKey && e.key === "k") {
		console.log(e)
		e.preventDefault();
		console.log("ctrl pressed")
		$open = true;
		searchInput.focus();
	}

	

}} />

<div use:portal>
	{#if $open}
		<div {...$overlay} use:overlay class="fixed inset-0 z-50 bg-black/50" />
		<div {...$content} use:content class="fixed left-[50%] top-[25%] z-50 max-h-[85vh] max-w-2xl w-full
             translate-x-[-50%] translate-y-[-50%] rounded-md 
            shadow-lg">
			<form use:enhance method="POST" class="bg-slate-700 rounded-t-lg">
				<div>
					<input type="text" class=" w-full text-2xl outline-none rounded-t-lg bg-transparent p-3  text-white" />
				</div>
			</form>
		</div>
	{/if}
</div>
<slot />


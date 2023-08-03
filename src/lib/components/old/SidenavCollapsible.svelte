<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { createCollapsible } from '@melt-ui/svelte';
	const { open, root, content, trigger } = createCollapsible();

	const dispatch = createEventDispatcher();

	$: $open, dispatch('to');
</script>

<div {...$root} use:root class="text-white">
	<button on:click {...$trigger} use:trigger class="w-full">
		<slot open={$open} name="label">label missing</slot>
	</button>
	{#if $open}
		<div {...$content} use:content>
			<slot name="options">missing options</slot>
		</div>
	{/if}
</div>

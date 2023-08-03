<script>
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	const open = getContext('open');
	const content = getContext('content');

	$: console.log('content is open: ', $open);
</script>

{#if $open}
	<div {...$content} use:content class="content">
		<slot />
	</div>
{/if}

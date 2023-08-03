<script lang="ts">
	import { getContext } from 'svelte';
	let trigger = getContext('trigger') as any;
</script>

<button {...$$restProps} class={'trigger'} {...$trigger} use:trigger>
	<slot />
</button>

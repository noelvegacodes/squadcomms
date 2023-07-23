<script>
	import { setContext } from 'svelte';
	import { createCollapsible } from '@melt-ui/svelte';

	let clazz = '';
	export { clazz as class };
	const { open, root, content, trigger } = createCollapsible();
	setContext('trigger', trigger);
	setContext('content', content);
	setContext('open', open);

	$: console.log($open);
</script>

<div {...$root} use:root class={clazz}>
	<slot open={$open} {trigger} content={$content} />
</div>

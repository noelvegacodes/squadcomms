<script lang="ts">
	export let name: string;
	export let url: string | null = null;
	export let size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	export let color: string;
	let hw: number;

	switch (size) {
		case 'sm':
			hw = 32;
			break;
		case 'md':
			hw = 44;
			break;
		case 'lg':
			hw = 52;
			break;
		case 'xl':
			hw = 72;
			break;
		case '2xl':
			hw = 100;
			break;
	}

	function getInitials() {
		let parts = name.split(' ');
		return parts.map((part) => part[0]).join('');
	}
</script>

<div
	class="rounded-full overflow-clip flex items-center justify-center {color}"
	style="--hw: {hw}px"
>
	{#if url}
		<img src={url} alt="{name} profile image" class="h-full w-full" />
	{:else}
		{getInitials()}
	{/if}
</div>

<style lang="postcss">
	div {
		height: var(--hw);
		width: var(--hw);
	}
</style>

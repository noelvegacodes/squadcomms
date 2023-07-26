<script lang="ts">
	import { page } from '$app/stores';
	import { Antenna, ChevronDown, Send } from 'lucide-svelte';

	$: route = $page.route.id?.split('/').slice(-1)[0];
</script>

<div class="thing h-full overflow-hidden relative">
	<header class="border-b-2 h-14 flex items-center gap-12 px-8">
		<div class="flex gap-2 items-center">
			<Antenna size={20} />
			<p class="font-semibold text-xl">
				{$page.params.id}
			</p>
			<ChevronDown size={20} />
		</div>
		<div class="flex border gap-2 rounded p-0.5">
			<a
				href="comms"
				class:active={route === 'comms'}
				class="p-1 hover:bg-gray-200 w-20 text-center rounded">Comms</a
			>
			<a
				href="kanban"
				class:active={route === 'kanban'}
				class="p-1 hover:bg-gray-200 w-20 text-center rounded">Kanban</a
			>
		</div>
	</header>
	<slot />
</div>

<style>
	.active {
		@apply bg-gray-200;
	}

	.thing {
		display: grid;
		grid-template-rows: auto 1fr;
	}
</style>

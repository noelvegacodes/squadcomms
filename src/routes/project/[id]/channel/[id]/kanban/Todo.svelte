<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { MoreHorizontal, PlusCircle } from 'lucide-svelte';

	export let title: string;
	export let description: string;
	export let notifications: number;

	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('clicked_todo')}>
	<article class="border-2 rounded-lg p-4">
		<header class="mb-2 flex justify-between">
			<h3 class="font-semibold">Fix overflow bug</h3>

			<MoreHorizontal size={20} class="text-gray-400" />
		</header>
		<div class="short-description">{description}</div>
		<footer class="flex justify-between items-center">
			<div class="flex avatars">
				<div
					class="bg-rose-600 h-8 w-8 rounded-full border-2 grid place-content-center text-white text-sm"
				>
					NV
				</div>
				<div
					class="bg-rose-600 h-8 w-8 rounded-full border-2 grid place-content-center text-white text-sm"
				>
					NV
				</div>
				<div
					class="bg-gray-300 h-8 w-8 rounded-full border-2 grid place-content-center text-gray-600 text-sm font-semibold"
				>
					+5
				</div>
				<button class="bg-g h-8 w-8 rounded-full text-gray-400 grid place-content-center text-sm">
					<PlusCircle size={16} />
				</button>
			</div>

			<div class="bg-red-500 text-white text-xs h-5 w-10 grid place-content-center rounded-full">
				{notifications}
			</div>
		</footer>
	</article>
</button>

<style lang="postcss">
	.avatars div:not(:first-child) {
		@apply -ml-4 border-[2px] border-white;
	}

	.avatars button:last-child {
		@apply border-2 border-gray-400 border-dashed ml-4;
	}

	.short-description {
		@apply text-sm mb-4 text-left;
	}
</style>

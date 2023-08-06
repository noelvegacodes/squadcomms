<script>
	import { MailPlus, Send, Settings } from 'lucide-svelte';
	import { AutoResizeTextarea } from 'svelte-autoresize-textarea';
</script>

<div class="grid">

		<!-- Message Feed -->


	<div class="conversations ">
		<header class="h-16 border-b border-slate-800 flex items-center justify-between px-4">
			<div class="text-xl font-semibold">Conversations</div>
			<div class="flex gap-4">
				<button>
					<Settings size={18} />
				</button>
				<button>
					<MailPlus size={18} />
				</button>
			</div>
		</header>
	</div>

	<div class=" feed-grid  ">
		<div class="w-full h-full" />
		<div />
		<div class="p-6">
			<div class="flex border border-slate-700 rounded-lg p-2">
				<AutoResizeTextarea
					placeholder="What's up ?!"
					class="resize-none w-full p-2 bg-transparent overflow-hidden outline-none"
				/>
				<div class="h-10 flex items-center justify-center">
					<Send size={28} />
				</div>
			</div>
		</div>
	</div>

</div>

<style lang="postcss">

	.grid {
		display: grid;
		grid-template-columns: 1fr;
	}

	.conversations {
		display: none;
	}

	.feed-grid {
		display: grid;
		grid-template-rows: 1fr auto;

		/* max-width: 500px; */
		/* min-width: 500px; */
		/* @apply max-w-2xl w-full; */
		
	}

	@media (min-width: 1000px) {
		.grid {
			grid-template-columns: 250px 1fr;
		}
		.conversations {
			display: block;
			@apply border-r border-slate-700;
		}
	}

	/* .selected {
		@apply bg-amber-500;
	} */
</style>

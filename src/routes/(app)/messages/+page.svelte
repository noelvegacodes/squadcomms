<script lang="ts">
	import {  Send } from 'lucide-svelte';
	import { AutoResizeTextarea } from 'svelte-autoresize-textarea';
	import AddConversationBtn from './AddConversationBtn.svelte';
</script>

<div class="grid">
	<!-- Message Feed -->
	<div class="conversations ">
		<header class="h-16 border-b border-slate-800 flex items-center justify-between px-4">
			<h2 class="text-xl font-semibold">Conversations</h2>
			<AddConversationBtn />
		</header>
	</div>

	<div class="feed-grid ">
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
</style>

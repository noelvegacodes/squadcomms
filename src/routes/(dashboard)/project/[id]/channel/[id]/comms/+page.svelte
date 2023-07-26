<script>
	import { Send } from 'lucide-svelte';
	import {messages} from '$lib/data/message'
</script>

<div class="chat ">
	<div class="min-h-0">
		<div class="flex flex-col gap-8 h-full overflow-auto px-8 ">
			<div class="mt-auto" />
			{#each messages as message}
				<div class="flex gap-4 w-full message">
					<div>
						<div class="bg-rose-600 h-16 w-16 rounded-lg text-white grid place-content-center text-lg">
							NV
						</div>
					</div>
					<div>
						<p><span class="font-bold">{message.name}</span> <span class="text-xs">{message.time}</span></p>
						<p>
							{message.text}
						</p>
					</div>
				</div>
			
			{/each}

		</div>
	</div>
	
	<div class="px-6 py-6 border-t-2 bg-white">
		<form class="border-2 rounded flex flex-col">
			<div class="flex border-b p-2">
				<textarea class="  w-full flex-1" placeholder="Message" />
				<button class=" h-fit bg-green-700 p-2 rounded-lg">
					<Send size={20} class="bg-green-700 text-white" />
				</button>
			</div>
			<div class="p-2">Rich text toolbar here</div>
		</form>
	</div> 

</div>


<style lang="postcss">
	.chat {
		display: grid;
		grid-template-rows: 1fr auto;
		min-height: 0;
	}

</style>




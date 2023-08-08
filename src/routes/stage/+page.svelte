<script lang="ts">

	import { Settings2 } from "lucide-svelte";
	import { createFocus } from "$lib/use-actions/createFocus";
	import Avatar from "$lib/components/Avatar.svelte";
	import { writable } from "svelte/store";
	const {focus, isFocused} = createFocus();
	let value: string;


	let val='';
	let searchedFor = '';
	let timer: NodeJS.Timeout;
	let results: any = []

	const active = writable(false);

	$: console.log($active)
	const content = (node: Node) => {
	
		function clickOff() { 
			$active = false;
		}
		function stopPropagation(e: Event) {
			$active = true
			e.stopPropagation();
		}
		
		window.addEventListener('click', clickOff)
		node.addEventListener('click', stopPropagation)

		return {
			destroy: () => {
				node.removeEventListener('click', stopPropagation);
				window.removeEventListener('click', clickOff);
			}
		}
	}

	const debounce = (v: string) => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			console.log(v)
			searchedFor = v;
			if(!v.trim()) {
				results = [];
				return
			}
			const response = await fetch('/stage?search='+v);
			const data = await response.json();
			if(!data) {
				results = []
				return
			}
			results = data
		}, 750);
	}

</script>
<button
  type="button"
  class="trigger"
  
  aria-label="Update dimensions"
>
  <Settings2 class="square-4" />
  <span class="sr-only">Open Popover</span>
</button>
<div class="p-10 w-96">
	<div use:content >
		<input type="text" class="border-2 py-1 px-4 mb-2 w-full" bind:value use:focus 
		on:keyup={(e) => {
			debounce(e.currentTarget.value)
		}}  />
		{#if $active}
			<div   class="bg-slate-950 w-full  rounded-lg border border-slate-700 shadow shadow-white">
				{#if searchedFor}
					<p class="text-slate-400 py-2 px-4">Searched for "{searchedFor}"</p>
				{:else}
					<p class="text-slate-400 py-2 px-4">Try searching for people</p>
				{/if}
				<ul class="overflow-clip">
					{#each results as user}
					<li class="hover:bg-slate-900 " >
					<a href="{user.handle}" class="py-2 px-4 block">
					<div class="flex gap-4">
						<Avatar  color="bg-blue-500" name={user.name} size="md" url={user.avatar}/>
						<div>
							<p class="font-semibold -mb-1 text-white">{user.name}</p>
							<p class="text-sm text-slate-400">@{user.handle}</p>
						</div>
					</div>
					</a>
					</li>
					{/each}
				</ul>
			</div>
			{/if}
	</div>

</div>
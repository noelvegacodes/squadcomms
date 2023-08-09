<script lang="ts">
	import { Search } from "lucide-svelte";
	import Avatar from "$lib/components/Avatar.svelte";
	import { createDebounce } from "$lib/debounce";
	import { createContent } from '$lib/actions/useContent'
	const {active, content} = createContent();
	const debounce = createDebounce()
	let value: string;

    const {class: c, placeholder} = $$restProps;

	let searchedFor = '';
	let results: any = []



	async function search() {
		searchedFor = value;
		if(!value.trim()) {
			results = [];
			return
		}
		const response = await fetch('/stage?search='+value);
		const data = await response.json();
		results = data
	}

    function startSearch() {
        debounce(() => search(), 750);
    }



</script>
<div use:content class="relative z-[10]">
    <div  class="flex items-center gap-4 px-4 py-2 border-slate-700 bg-slate-800 rounded-full {c}" >
        <label for="search">
            <Search size={16} class="text-slate-300" />
        </label>
        <input id="search" name="search" on:keyup={startSearch} type="text" class="text-white bg-transparent outline-none flex-1" placeholder={placeholder} bind:value />
    </div>
    {#if $active}
        <div   class="absolute top-12 bg-slate-950 w-full  rounded-lg border border-slate-700 shadow shadow-slate-300">
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
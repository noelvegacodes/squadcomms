<script lang="ts">
    import { flip } from 'svelte/animate';
	import { MoreHorizontal, Plus, PlusCircle } from 'lucide-svelte';
    import {dndzone} from "svelte-dnd-action";
	import NewListButton from './NewListButton.svelte';
	import NewTaskButton from './NewTaskButton.svelte';
	import type { List } from '$lib/types';
    const flipDurationMs = 200;

	export let lists: List[];

        function handleDndConsiderColumns(e: any) {
        lists = e.detail.items;
    }
    function handleDndFinalizeColumns(e: any) {
        lists = e.detail.items;
    }

        function handleDndConsiderCards(cid: any, e: any) {
            const colIdx = lists.findIndex(c => c.id === cid);
            console.log("considering", e.detail.items, colIdx)
        lists[colIdx].items = e.detail.items;
        lists = [...lists];
    }
    function handleDndFinalizeCards(cid: any, e: any) {
        const colIdx = lists.findIndex(c => c.id === cid);
        lists[colIdx].items = e.detail.items;
        console.log('finalize', lists)
        lists = [...lists];
    }
</script>


<div class="flex h-full overflow-x-auto gap-6 p-4">

    <div class="flex gap-6  h-full " 
        use:dndzone="{{items: lists, type: 'columns', flipDurationMs}}" 
        on:consider={handleDndConsiderColumns} 
        on:finalize={handleDndFinalizeColumns}
    > 
        {#each lists as list(list.id)}
            <div class="h-full shrink-0 w-96 bg-white  border border-transparent hover:border-gray-300 flex flex-col p-4 rounded transition-all duration-200 "
            animate:flip="{{duration: flipDurationMs}}"
            >
                <h2 class=" font-semibold text-xl mb-2">{list.name}</h2>
    
                <NewTaskButton listId={list.id}>
                    <div class="bg-gray-100 hover:bg-gray-200 flex justify-center py-2 rounded-lg w-full"><Plus size={20} /></div>
                </NewTaskButton>
                <div class="flex flex-col gap-2 flex-1 p-1 overflow-auto h-full" 
    
                    use:dndzone={{items:list.items, flipDurationMs}} 
                    
                    on:consider={(e) => handleDndConsiderCards(list.id, e)} 
                    on:finalize={(e) => handleDndFinalizeCards(list.id, e)}
                >
                    {#each list.items as todo(todo.id)}
                        <button class="bg-white"
                        animate:flip="{{duration: flipDurationMs}}"
                        >
                            <article class="border-2 rounded-lg p-4">
                                <header class="mb-2 flex justify-between">
                                    <h3 class="font-semibold">{todo.name}</h3>
                                    <MoreHorizontal size={20} class="text-gray-400" />
                                </header>
                                <div class="short-description">{todo.description}</div>
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
                                        {todo.notification}
                                    </div>
                                </footer>
                            </article>
                        </button>
                    {/each}
                </div>
            </div>
        {/each}
    
    </div>
    <NewListButton>
        <div class="h-full shrink-0 w-96 border bg-gray-100 text-gray-500  grid place-content-center gap-6 border-gray-300 p-4 rounded transition-all duration-200 "
        >
                    <div class="flex gap-2 items-center text-2xl">
            List <Plus size={24} />
        </div> 
    </div>
    </NewListButton>
</div>

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

    <script lang="ts">
	import { addList, addTask } from '$lib/data/kanban';
  import { createDialog } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
  export let listId: string;

    const { trigger, portal, overlay, content, title, description, close, open} = createDialog();
    
    let name: string = ''
    </script>
    
        <button 
          class=""
            
            {...$trigger}
            use:trigger
        ><slot /></button>
        
        <div use:portal>
            {#if $open}
            <div {...$overlay} use:overlay class="fixed inset-0 z-40 bg-black/50" transition:fade={{duration: 100}} />
        
            <div
              class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
                    max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white
                    p-6 shadow-lg"
              transition:fly={{
                duration: 150,
                y: 8,
                // start: 0.96,
              }}
              {...$content} use:content
            >
              <h2 {...$title} use:title class="mb-4 text-lg font-medium text-black">
                New List
              </h2>

         
              <fieldset class="flex flex-col gap-2">
                <label for="name">
                  Name
                </label>
                <input
                  class="inline-flex p-2 w-full flex-1 items-center justify-center
                            rounded-sm border border-solid px-3 leading-none text-magnum-800"
                  id="name"
                  bind:value={name}
                />
              </fieldset>

              <div class="mt-6 flex justify-end gap-4">
                <button
                  {...$close} use:close
                  class="inline-flex h-8 items-center justify-center rounded-[4px]
                            bg-zinc-100 px-4 font-medium leading-none text-zinc-600"
                >
                  Cancel
                </button>
                <button
                  on:click={() => {
                    if(!name.trim()) return
                    addTask({listId, name})}}
                  {...$close} use:close
                  class="inline-flex h-8 items-center justify-center rounded-[4px]
                             px-4 font-medium leading-none bg-green-200 text-green-600"
                >
                  Create
                </button>
              </div>
         
              <button
                {...$close} use:close
                aria-label="close"
                class="absolute right-[10px] top-[10px] inline-flex h-6 w-6
                        appearance-none items-center justify-center rounded-full text-magnum-800
                        hover:bg-magnum-100 focus:shadow-magnum-400"
              >
                <X />
              </button>
            </div>
        
            {/if}
        </div>
    
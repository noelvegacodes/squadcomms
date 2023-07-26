<script>
    import {page} from '$app/stores'
	import { Plus, Square } from 'lucide-svelte';
</script>
<div class="h-full  p-12">
    <h2 class="text-4xl font-semibold mb-12">Marketing Website</h2>
    <div class="flex flex-col gap-4 mb-20">
        <div class="grid-row">
            <p class="text-gray-700 font-medium">Lead:</p>
            <p>Noel Vega</p>
        </div>
            <div class="grid-row">
            <p class="text-gray-700 font-medium">Deadline:</p>
            <p class="font-semibold">23 Jan 2023</p>
        </div>
            <div class="grid-row">
            <p class="text-gray-700 font-medium">Tags:</p>
            <ul class="flex gap-2 text-sm font-semibold">
                <li class="bg-yellow-200 text-yellow-600 px-2 flex items-center rounded">UI Design</li>
                <li class="bg-blue-200 text-blue-600 px-2 flex items-center rounded">Marketing</li>
            </ul>
        </div>
    </div>

    <div>
        <nav class="border-b mb-8">
            <ul class="flex">
                <li class="border-b-2 border-b-teal-500 px-6 pb-2">Overview</li>
            </ul>
        </nav>

        <div class="px-10">
            <div class="mb-6">
                <h3 class="font-semibold text-xl mb-1">Summary</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat harum quod facilis recusandae, dolor modi consectetur et iste rerum quia cumque ullam! Illum autem cupiditate fugit vel est repudiandae ad.
                Aspernatur nam rerum distinctio eos quo ut cumque praesentium nesciunt eveniet expedita velit labore cupiditate ab, minima placeat corrupti sapiente officia in soluta suscipit rem atque fugiat iure? Optio, voluptate.</p>
            </div>

            <div class="mb-6">
                <h3 class="font-semibold text-xl mb-2">Team</h3>
                <div class="flex gap-8">
                    <div class="flex items-center gap-2">
                        <div class="h-10 w-10 rounded-full bg-white border-2 border-dashed border-gray-500 text-white grid place-content-center">
                            <Plus size={20} class="text-gray-500" />
                        </div>
                        <p>Add Member</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="h-10 w-10 rounded-full bg-rose-500 text-white grid place-content-center">NV</div>
                        <div>
                            <p class="font-semibold">Noel Vega</p>
                            <p>Project Owner</p>
                        </div>
                    </div>
    
                    <div class="flex items-center gap-2">
                        <div class="h-10 w-10 rounded-full bg-rose-500 text-white grid place-content-center">NV</div>
                        <div>
                            <p class="font-semibold">Noel Vega</p>
                            <p>Project Owner</p>
                        </div>
                    </div>
    
                    <div class="flex items-center gap-2">
                        <div class="h-10 w-10 rounded-full bg-rose-500 text-white grid place-content-center">NV</div>
                        <div>
                            <p class="font-semibold">Noel Vega</p>
                            <p>Project Owner</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 class="font-semibold text-xl mb-2">Milestones</h3>
                <ul class="flex flex-col gap-2">
                    <li class="flex items-center gap-4">
                        <Square size={20} class="rotate-45 text-teal-500 fill-teal-500" />
                        <p>Wireframe</p>
                    </li>
                    <li class="flex items-center gap-4">
                        <Square size={20} class="rotate-45 text-teal-500 " />
                        <p>Create design system</p>
                    </li>
                    <li class="flex items-center gap-4">
                        <Square size={20} class="rotate-45 text-teal-500 " />
                        <p>Cloud Storage</p>
                    </li>
                    <li class="flex items-center gap-4">
                        <Square size={20} class="rotate-45 text-teal-500 " />
                        <p>$100k funding</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</div>

<style lang="postcss">
    .grid-row { 
        display: grid;
        grid-template-columns: 200px 500px;
    }
</style>
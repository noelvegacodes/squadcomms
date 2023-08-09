
<script lang="ts">
	import Avatar from "./Avatar.svelte";

    	type User = {
		name: string, 
		avatar: string, 
		handle: string
	}
	
    export let users: User[]
    </script>

<ul class="overflow-clip bg-white">
    {#each users as user}
        <li>
            <a href="{user.avatar}" class="py-2 px-4 block">
            <div class="flex gap-4">
                <Avatar  color="bg-blue-500" name={user.name} size="md" url={user.avatar}/>
                <div>
                    <p class="font-semibold -mb-1 text-black">{user.name}</p>
                    <p class="text-sm text-black">@{user.handle}</p>
                </div>
            </div>
            </a>
        </li>
    {/each}
</ul>

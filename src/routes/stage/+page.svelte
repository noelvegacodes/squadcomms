<script lang="ts">
	import { createContent } from '$lib/actions/useContent'
	import Users from '$lib/components/Users.svelte'
	const {active, content} = createContent();
	import {createSearch} from '$lib/actions/useSearch';
	import Spinner from "$lib/components/Spinner.svelte";
	type User = {
		name: string, 
		avatar: string, 
		handle: string
	}
	
	// Your fetch function
	async function searchUsers(value: string): Promise<User[]> {
		const response = await fetch('/stage?search='+value);
		return await response.json();
	}

	// Usage
	const {results: users, term, isLoading, search} = createSearch([], searchUsers);
</script>

<div class="p-10 w-96">
	<div use:content>
		<p class="text-white">input value: {$term}</p>
		<div class="flex gap-4 items-center">
			<div>
				<input type="text" class="border-2 py-1 px-4 mb-2 flex-1" placeholder="Search users" use:search  />
			</div>
			{#if $isLoading}
			<Spinner />
			{/if}
		</div>
		{#if $active}
			<Users users={$users} /> 
		{/if}
		
	</div>
</div>
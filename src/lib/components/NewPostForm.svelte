<script lang="ts">
	import { enhance } from '$app/forms';
	import { ImagePlus, ListTodo } from 'lucide-svelte';
	import { AutoResizeTextarea } from 'svelte-autoresize-textarea';
	import { user } from '$lib/stores/mock/user';
	import Avatar from '$lib/components/Avatar.svelte';
</script>

<form method="POST" class="post-form" action="/api/post" use:enhance>
	<Avatar size="md" url={$user.avatar} name="{$user.fname} {$user.lname}" color="bg-amber-500" />
	<div class="flex-1">
		<AutoResizeTextarea
			name="text"
			placeholder="What is happening?!"
			class="resize-none w-full p-2 bg-transparent text-xl overflow-hidden outline-none"
		/>
		<div class="px-2 flex gap-4 items-center">
			<ImagePlus size={20} />
			<ListTodo size={20} />
			<button type="submit">Post</button>
		</div>
	</div>
</form>

<style lang="postcss">
	.post-form {
		@apply flex gap-4 p-6 border-b border-slate-700;
		& button[type='submit'] {
			@apply bg-blue-500 text-white py-1 px-4 rounded-full ml-auto;
		}
	}
</style>

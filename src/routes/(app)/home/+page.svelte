<script lang="ts">
	import { createImagePreviewer } from 'svelte-img-previewer';
	import Avatar from '$lib/components/Avatar.svelte';
	import Post from '$lib/components/Post.svelte';
	import { ImagePlus, ListTodo } from 'lucide-svelte';
	import { AutoResizeTextarea } from 'svelte-autoresize-textarea';
	import { superForm } from 'sveltekit-superforms/client';

	const {src, imagePreviewer} = createImagePreviewer();


	export let data;
	const { form, enhance } = superForm(data.form);
</script>

<form method="POST" class="post-form"  action="?/createPost" use:enhance >
	<Avatar size="md" url={data.user.avatar} name="{data.user.name}" color="bg-amber-500" />
	<div class="flex-1">
		<AutoResizeTextarea
			name="text"
			placeholder="What is happening?!"
			class="resize-none w-full p-2 bg-transparent text-xl overflow-hidden outline-none"
			bind:value={$form.text}
		/>

		{#if $src}
		<div class="max-h-[700px] h-fit rounded-lg overflow-clip border-2 border-slate-600">
			<div class="img-container">
				<img src={$src} alt="post" class="h-full w-full object-fill " />
			</div>
		</div>
				{/if}
		<div class="px-2 flex gap-4 items-center">
			<label for="postImg" class="cursor-pointer">
				<ImagePlus size={20} />
				<input id="postImg" name="postImg" hidden type="file" accept="image/*" use:imagePreviewer />
			</label>

			<ListTodo size={20} />
			<button type="submit">Post</button>
		</div>
	</div>
</form>
{#each data.timeline as post}
	<Post {...post} />
{:else}
	<p>You haven't posted yet</p>
{/each}

<style lang="postcss">
	.post-form {
		@apply flex gap-4 p-6;
		& button[type='submit'] {
			@apply bg-blue-500 text-white py-1 px-4 rounded-full ml-auto;
		}
	}
	/* .img-container {
		aspect-ratio: 1;
	} */
</style>


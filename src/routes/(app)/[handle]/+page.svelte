<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	export let data;
</script>

<div class="divide-y divide-slate-700">
	{#each data.timeline as post}
		<Post avatar={data.user.avatar} image={post.image} name={data.user.name} content={post.text} date={(new Date()).toLocaleDateString('en-us', {
							month: 'long',
							year: 'numeric'
						})}   handle={data.user.handle} comments={0} reposts={0} likes={0} />
	{/each}
</div>

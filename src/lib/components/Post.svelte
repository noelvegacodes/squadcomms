<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import { Heart, MessagesSquare, Repeat, Share } from 'lucide-svelte';
	export let name: string;
	export let handle: string;
	export let content: string;
	export let avatar: string | null;
	export let date: string;
	export let comments: number;
	export let reposts: number;
	export let likes: number;
	export let image: string | null = null;
</script>

<div class="flex p-6 pb-2 gap-4">
	<Avatar size="md" name={name} url={avatar} color="bg-blue-500" />
	<div class="flex-1 -mt-1">
		<div class="flex items-center gap-2">
			<p class="font-bold text-slate-100">{name}</p>
			<p class="text-sm text-slate-400">@{handle}</p>
			<p class=" text-xs text-slate-400">{date}</p>
		</div>

		<!-- Post Content -->
		<div class=" mb-4">
			<p class="text-slate-100 mb-4">{content}</p>
			{#if image}
				<div class="flex justify-center mb-2">
					 <!-- h-[450px] -->
					<div class="img-container max-h-[450px] rounded-lg overflow-clip border-2 border-slate-600">
						<img src={image} class="w-full h-full object-cover" alt="post" />
					</div>
				</div>
			{/if}
		</div>

		<!-- Comments Reposts Likes -->
		<div class="h-12 flex justify-between">
			<button class=" h-full flex items-center gap-2  group transition-all duration-200">
				<div
					class="h-8 w-8 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-blue-500 rounded-full transition-all duration-200"
				>
					<MessagesSquare size={16} />
				</div>
				<div class="group-hover:text-blue-500 transition-all duration-200 text-sm">
					{comments}
				</div>
			</button>
			<button
				class=" h-full flex justify-center items-center gap-2 group transition-all duration-200"
			>
				<div
					class="h-8 w-8 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-emerald-500 rounded-full transition-all duration-200"
				>
					<Repeat size={16} />
				</div>
				<div class="group-hover:text-emerald-500 transition-all duration-200 text-sm">
					{reposts}
				</div>
			</button>
			<button
				class=" h-full flex justify-end items-center gap-2  group transition-all duration-200"
			>
				<div
					class="h-8 w-8 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-rose-500 rounded-full transition-all duration-200"
				>
					<Heart size={16} />
				</div>
				<div class="group-hover:text-rose-500 transition-all duration-200 text-sm">
					{likes}
				</div>
			</button>
		</div>
	</div>
</div>

<style>
	.img-container {
		aspect-ratio: 1;
	}
</style>
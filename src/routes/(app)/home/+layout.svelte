<script lang="ts">
	import { page } from '$app/stores';
	import Search from '$lib/components/Search.svelte';
</script>

<!-- <svelte:window on:keydown={(e) => {
	console.log(e)
	
	if(e.ctrlKey && e.key === "s") {
		e.preventDefault();
		console.log("ctrl pressed")
		searchInput.focus();
	}
}} /> -->

<div class="wrapper divide-x divide-slate-700">
	<div class="thing">
		<header >
			<a href="/home">
				<div class="w-fit">
					<p class="mb-2">For you</p>
					<div class="h-0.5 rounded-full" class:selected={$page.url.pathname.endsWith('/home')} />
				</div>
			</a>
			<a href="/home/following">
				<div class="w-fit">
					<p class="mb-2">Following</p>
					<div
						class="h-0.5 rounded-full"
						class:selected={$page.url.pathname.endsWith('/following')}
					/>
				</div>
			</a>
		</header>

		<main class="divide-y divide-slate-700">
			<slot />
		</main>
	</div>

	<!-- Extra Content -->
	<aside class="px-4 py-4 ">
		<!-- TODO: make search component -->
		<!-- <div class="search hidden  items-center gap-2 px-4 py-2 border-slate-700 bg-slate-800 rounded-full">
			<Search size={16} class="text-slate-300" />
			<input type="text" placeholder="Search Buildstory" bind:this={searchInput}/>
		</div> -->
		<Search />

		<div class="card  bg-slate-900 h-96 rounded-lg border border-slate-700" />
		<div class="card  bg-slate-900 h-96 rounded-lg border border-slate-700" />
	</aside>
</div>

<style lang="postcss">
	.wrapper {
		display: grid;
		grid-template-columns: 1fr;
		overflow: hidden ;
	}

	.thing {
		display: grid;
		grid-template-rows: 64px 1fr;
		overflow: hidden;
	}

	main {
		@apply overflow-y-auto;

	}


	aside {
		display: none;
	}

	@media (min-width: 1000px) {
		.wrapper {
			grid-template-columns: 1fr auto;
		}
		aside {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		.search {
			display: flex;
		}
	}

	@container extra (min-width: 275px) {
	.card, .search {
			display: block
		}
	} 

	header {
		@apply flex items-end sticky top-0 z-10 border-b border-slate-700;

		& a {
			@apply h-full flex-1 flex justify-center items-end;
			@apply text-center text-xl;
			@apply hover:bg-slate-900 transition-colors duration-200;
		}
	}

	.search {

		& input {
			@apply bg-transparent outline-none placeholder:text-slate-300;
		}
	}

	.selected {
		@apply bg-amber-500;
	} 
</style>

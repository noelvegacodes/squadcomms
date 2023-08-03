<script>
	import { page } from '$app/stores';
	import {  Search } from 'lucide-svelte';
</script>

<div class="wrapper">
	<main>
		<header>
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

		<!-- Post Form -->
		<!-- TODO: Turn into component -->
        <div class="overflow-y-auto">

            <slot />
        </div>
	</main>

	<!-- Extra Content -->
	<aside class="flex flex-col gap-4 px-8 py-4">
        <!-- TODO: make search component -->
        <div class="search">
            <Search size={16} class="text-slate-300" />
            <input type="text" placeholder="Search Buildstory" />
        </div>

        <div class="bg-slate-900 h-96 rounded-lg border border-slate-700" />
        <div class="bg-slate-900 h-96 rounded-lg border border-slate-700" />
	</aside>
</div>

<style lang="postcss">
	.wrapper {
        @apply h-[100dvh];
		@apply divide-x divide-slate-700;
		display: grid;
		grid-template-columns: 700px 1fr;
        /* @apply border-4 border-red-500; */
	}

    main {
        @apply min-h-0 h-full;
        display: grid;
        grid-template-rows: 64px auto 1fr;
    }

	header {
		@apply flex items-end sticky top-0 z-10;
		@apply border-b border-slate-700 bg-slate-950;

		& a {
			@apply h-full flex-1 flex justify-center items-end;
			@apply text-center text-xl;
			@apply hover:bg-slate-900 transition-colors duration-200;
		}
	}



    .search {
        @apply flex items-center gap-2 px-4 py-2 border-slate-700 bg-slate-800 rounded-full;
        & input {
            @apply bg-transparent outline-none placeholder:text-slate-300;
        }
    }

	.selected {
		@apply bg-amber-500;
	}

</style>

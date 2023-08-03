<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$lib/stores/mock/user';
	const { fname, lname, handle, avatar, banner, country, bio } = $user;
</script>

<div class="wrapper">
	<main>
		<header class="h-16 border-b border-slate-700 sticky top-0 bg-slate-950 z-10" />

		<div class="overflow-y-auto">
			<!-- Profile bio -->
			<section class="p-6 border-b border-slate-700">
				<div class="relative">
					<div class="h-52 bg-gray-500 rounded-xl overflow-hidden">
						<img src={banner} alt="user-banner" class="h-full w-full" />
					</div>
					<div
						class="text-white text-lg font-semibold bg-purple-500 rounded-full h-24 w-24 flex items-center justify-center absolute -translate-y-1/2 left-10 shadow-lg overflow-clip"
					>
						<img src={avatar} alt="user-avatar" class="h-full w-full" />
					</div>
				</div>
				<div class="pt-16 pb-6">
					<p class="mb-1">{fname} {lname}</p>
					<div class="mb-2">{handle} - {country}</div>
					<p>{bio}</p>
				</div>
				<div class="flex text-sm follow-bar">
					<a href="#" class="flex-1 flex gap-2">
						328 <span>following</span>
					</a>
					<a href="#" class="flex-1 flex justify-center gap-2">
						<div>328 <span>followers</span></div>
					</a>
					<a href="#" class="flex-1 flex justify-end gap-2">
						<div>May 2022 <span>joined</span></div>
					</a>
				</div>
			</section>
	
			<!-- Profile section tabs -->
			<section class="flex h-14 sticky top-0 border-b z-10 border-slate-700  bg-slate-950 ">
				<a
					href="/profile/timeline"
					class="flex-1 text-center flex justify-center hover:bg-slate-900 transition-colors duration-200 h-full"
				>
					<div class="w-fit flex flex-col justify-between h-full">
						<div class="flex-1" />
						<div class="px-4">Timeline</div>
						<div class="flex-1" />
						<div
							class="h-0.5 mt-auto rounded-full"
							class:selected={$page.url.pathname.endsWith('/profile/timeline')}
						/>
					</div>
				</a>
				<a
					href="/profile/projects"
					class="flex-1 text-center flex justify-center hover:bg-slate-900 h-full items-end transition-colors duration-200"
				>
					<div class="w-fit flex flex-col justify-between h-full">
						<div class="flex-1" />
						<div class="px-4">Projects</div>
						<div class="flex-1" />
						<div
							class="h-0.5 mt-auto rounded-full"
							class:selected={$page.url.pathname.endsWith('/profile/projects')}
						/>
					</div>
				</a>
				<a
					href="/profile/about"
					class="flex-1 text-center flex justify-center hover:bg-slate-900 h-full items-end transition-colors duration-200"
				>
					<div class="w-fit flex flex-col justify-between h-full">
						<div class="flex-1" />
						<div class="px-4">About</div>
						<div class="flex-1" />
						<div
							class="h-0.5 mt-auto rounded-full"
							class:selected={$page.url.pathname.endsWith('/profile/about')}
						/>
					</div>
				</a>
			</section>
	
			<!-- Tabbed section -->
			<section class="">
				<slot />
			</section>

		</div>
	</main>
	<aside></aside>
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
        grid-template-rows: 64px 1fr;
    }

	.follow-bar {
		& a {
			@apply py-2;
		}
	}

	.selected {
		@apply bg-amber-500;
	}
</style>

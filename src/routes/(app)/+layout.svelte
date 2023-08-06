<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { AlignJustify, BellRing, BookOpenCheck, Home, ListTodo, LogOut, Mail,  User, X } from 'lucide-svelte';
	import { fly, slide } from 'svelte/transition';
	$: pathname = $page.url.pathname;

	$: showMobileNav = false;

	const closeMobileNav = () => showMobileNav = false;
	const toggleMobileNav = () => showMobileNav = !showMobileNav;

</script>

<div class="wrapper divide-x divide-slate-700">
	<nav class="side-nav">
		<div>
			<a href="/home" class="logo">
				<BookOpenCheck size={24} class="text-amber-500" />
				<span class="text-2xl font-bold">Buildstory</span>
			</a>
		</div>
		<ul>
			<li>
				<a href="/home" on:click={closeMobileNav}  class:selected={pathname.startsWith('/home')}>
					<Home size={24} />
					<span class="">Home</span>
				</a>
			</li>
			<li>
				<a href="/notifications" on:click={closeMobileNav} class:selected={pathname.startsWith('/notifications')}>
					<BellRing size={24} />
					<span class="">Notifcations</span>
				</a>
			</li>
			<li>
				<a href="/messages" on:click={closeMobileNav} class:selected={pathname.startsWith('/messages')}>
					<Mail size={24} />
					<span class="">Messages</span>
				</a>
			</li>
			<li>
				<a href="/projects" on:click={closeMobileNav} class:selected={pathname.startsWith('/projects')}>
					<ListTodo size={24} />
					<span class="">Projects</span>
				</a>
			</li>
			<li>
				<a href="/profile" on:click={closeMobileNav} class:selected={pathname.startsWith('/profile')}>
					<User size={24} />
					<span class=" ">Profile</span>
				</a>
			</li>
			<form method="post" action="actions/?/logout" use:enhance class="mt-auto">
				<button
					type="submit"
					class=" flex gap-4 items-center text-lg p-4 hover:bg-slate-900/80 rounded-full"
				>
					<LogOut size={20} class="rotate-180" /><span class=" ">Logout</span></button
				>
			</form>
		</ul>
	</nav>
	<div class=" main grid">
		<slot />
		<nav class="mobile-nav z-50">
			{#if showMobileNav}
				<div transition:fly={{y: 1000, opacity: 1}} class="mobile-nav-menu fixed h-full bg-slate-950 top-0 left-0 w-full z-50">
					<button on:click={closeMobileNav}>
						<X size={20}/>
					</button>
				</div>
			{/if}
			<ul class="flex h-16 justify-around items-center z-50 bg-slate-950 w-full border-t border-slate-700">
				<li class=" ">
					<a href="/home" on:click={closeMobileNav}  class:selected={pathname.startsWith('/home')}>
						<Home size={24} />
					</a>
				</li>
				<li>
					<a href="/notifications" on:click={closeMobileNav} class:selected={pathname.startsWith('/notifications')}>
						<BellRing size={24} />
					</a>
				</li>
				<li>
					<a href="/messages" on:click={closeMobileNav} class:selected={pathname.startsWith('/messages')}>
						<Mail size={24} />
					</a>
				</li>
				<li>
					<button on:click={toggleMobileNav}  class:selected={pathname.startsWith('/projects')}>
						<AlignJustify size={24} />
					</button>
				</li>
			</ul>
		</nav>
	</div>

</div>

<style lang="postcss">
	.wrapper {
		/* max-width: 768px; */
		height: 100dvh;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		@apply h-full  mx-auto overflow-hidden;
		@apply text-white ;
		/* @apply border-2 border-red-500; */
	}

	.grid {
		display: grid;
		grid-template-rows: 1fr auto;
	}

	.side-nav {
		display: none;
	}

	.main {
		height: 100dvh;
	}

	.mobile-nav {
		@apply  w-full h-16 bg-slate-950 z-[50] border-t border-slate-700;
	}

	.selected {
		@apply text-amber-500 font-semibold border-slate-700;
	}

	@media (min-width: 500px) {
		.wrapper {
			height: 100dvh;
			display: grid;
			grid-template-columns: auto 1fr;
		}
		.mobile-nav {
			display: none;
		}
		.side-nav {	
			height: 100dvh;
			@apply w-fit flex flex-col ;
		}
		.side-nav .logo {
			@apply h-16 flex items-center gap-2 pl-6 border-b border-slate-700;
		} 

		.side-nav ul {
			@apply flex flex-col flex-1 w-full gap-2 py-2 px-2 text-slate-200;
		}

		.side-nav ul a {
			@apply flex items-center p-4 gap-4;
			@apply text-lg border border-transparent hover:border-slate-700 rounded-full;
		}
		.side-nav span {
			display: none;
		}


	}

	@media(min-width: 1000px) {
		.wrapper {
			max-width: 1100px;
		}

	}

	@media(min-width: 1300px) {
		.wrapper {
			max-width: 1200px;
		}

		.side-nav span {
			display: block;
		}

	}


</style>

<script>
	import { enhance } from '$app/forms';
	import { BookOpenCheck } from 'lucide-svelte';
	export let data;
</script>

<div class="border-b-2 border-slate-800">
	<nav class="text-white flex justify-between gap-6 p-6 max-w-7xl mx-auto">
		<a href="/" class="logo flex gap-2 text-2xl items-center">
			<BookOpenCheck size={24} class="text-amber-500  " />
			<span class="leading-none font-bold">Buildstory</span>
		</a>
		<ul class="flex gap-6 font-semibold">
			{#if !data.session}
				<a href="/signup">Sign up</a>
				<a href="/signin">Login</a>
			{/if}
			{#if data.session}
				<form method="post" action="actions/?/logout" use:enhance>
					<input type="submit" value="Sign out" class="cursor-pointer" />
				</form>
			{/if}
			{#if data.session}
				<a href={`/${data.session.user.handle}`}>Profile</a>
			{/if}
		</ul>
	</nav>
</div>

<script lang="ts">
	import { AtSign, BookOpenCheck } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, enhance} = superForm(data.form)
</script>

<div class="wrapper">
	<header class="p-6 max-w-7xl w-full mx-auto">
		<a href="/" class="logo flex gap-2 text-2xl items-center">
			<BookOpenCheck size={24} class="text-amber-500  " />
			<span class="leading-none font-bold text-white">Buildstory</span>
		</a>
	</header>

	<div class="flex justify-center pt-20">
		<div class="w-full h-fit bg-white max-w-lg p-6 sm:p-8 rounded-lg">
			<form method="post" use:enhance class="mb-4">
				<h1 class="text-xl font-bold mb-4">Sign up</h1>
				<div class="flex flex-col gap-4">
					<label for="email">Email</label>
					<input name="email" id="email" bind:value={$form.email} />
					<div class="flex gap-4">
						<div class="flex-1">
							<label for="name">Name</label>
							<input name="name" id="name" bind:value={$form.name} />
						</div>
						<div class="flex-1">
							<label for="handle">Handle</label>
							<input name="handle" id="handle" class="border pl-8" bind:value={$form.handle} />
							<AtSign size={16} class="absolute top-[33px] left-2 text-slate-400" />
						</div>
					</div>
					<label for="password">Password</label>
					<input type="password" name="password" id="password" bind:value={$form.password} />
					<button type="submit" class="bg-amber-500 text-white py-1 px-4 rounded font-semibold"
						>Submit</button
					>
				</div>
			</form>
			<p class="text-sm">
				Already have an account? <a
					href="/signin"
					class="text-blue-500 hover:underline whitespace-nowrap">Sign in</a
				>
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.wrapper {
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	label {
		@apply block;
	}

	input {
		@apply border shadow-sm w-full rounded p-1 pl-2;
	}

	input[name='handle'] {
		@apply pl-[28px];
	}
</style>

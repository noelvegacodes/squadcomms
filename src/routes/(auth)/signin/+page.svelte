<!-- routes/signin/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import { BookOpenCheck } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	

	export let data;
	const { form, enhance} = superForm(data.form)

</script>


	<div class="flex justify-center pt-20 px-4 sm:px-0">
		<!-- {#if $flash}
			{@const bg = $flash.type == 'success' ? '#3D9970' : '#FF4136' }
			<div style:background-color={bg} class="flash">{$flash.message}</div>
		{/if} -->
		<div class="w-full h-fit bg-white max-w-md p-6 sm:p-8 rounded-lg">
			<form method="post" use:enhance  class="mb-4">
				<h1 class="text-xl font-bold mb-4">Sign in</h1>
				<label for="email">Email</label>
				<input name="email" id="email" bind:value={$form.email} /><br />
				<label for="password">Password</label>
				<input type="password" name="password" id="password" bind:value={$form.password}/><br />
				<button type="submit" class="bg-amber-500 text-white py-1 px-4 rounded font-semibold"
					>Submit</button
				>
			</form>
			<p class="text-sm">
				Dont have an account? <a
					href="/signup"
					class="text-blue-500 hover:underline whitespace-nowrap">Sign up</a
				>
			</p>
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
		@apply border shadow-sm w-full rounded p-1 pl-2 mb-4;
	}
</style>

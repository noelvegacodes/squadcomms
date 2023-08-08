<!-- routes/email-verification/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/Spinner.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const {form, submitting} = superForm(data.form);

	$: $submitting
</script>

<form method="post" use:enhance >
	<p class="text-white font-semibold text-xl text-center mb-10">Success! Confirm your email before logging in!</p>
	<div class="flex flex-col w-fit items-center justify-center mx-auto">
		<input hidden type="email" bind:value={$form.email} />
		<button type="submit" disabled={$submitting} class="bg-amber-600 py-1 px-4 rounded text-white font-semibold text-xl mb-8">resend</button>
		{#if $submitting}
		<p class="text-white text-3xl">Hell</p>
			<Spinner />
		{/if}
	</div>
</form>

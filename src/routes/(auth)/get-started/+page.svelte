<script lang="ts">
	import { AtSign } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { isEmpty } from '$lib/utils.js';
	export let data;

	const { form: signupForm, errors, constraints, enhance, message } = superForm(data.signupForm);
</script>

<form method="POST" use:enhance class="border-2 max-w-2xl mx-auto p-10 rounded-lg mt-20 bg-white">
	{#if !isEmpty($errors)}<p class="text-red-500">Invalid form input</p>{/if}
	{#if $message}<p class="text-red-500">{$message}</p>{/if}

	<div class="flex flex-col gap-4">
		<div class="flex flex-col flex-1">
			<label for="email">Email</label>
			<input
				name="email"
				id="email"
				type="text"
				placeholder="Rick.Astley@example.com"
				class="border-2 rounded-lg p-1 px-2"
				bind:value={$signupForm.email}
				{...$constraints.email}
			/>
			{#if $errors.email}
				<p class="text-red-500">{$errors.email}</p>
			{/if}
		</div>
		<div class="flex gap-10">
			<div class="flex flex-col flex-1">
				<label for="email">Name</label>
				<input
					name="name"
					id="name"
					type="text"
					placeholder="Rick Astley"
					class="border-2 rounded-lg p-1 px-2"
					bind:value={$signupForm.name}
					{...$constraints.name}
				/>
				{#if $errors.email}
					<p class="text-red-500">{$errors.name}</p>
				{/if}
			</div>
			<div class="flex flex-col flex-1">
				<label for="handle">Handle</label>
				<div class=" flex items-center">
					<div class="h-full border-2 border-r-0 rounded-l-lg px-1 items-center flex">
						<AtSign size={18} class="text-gray-400" />
					</div>
					<input
						name="handle"
						id="handle"
						type="text"
						placeholder="Ricky"
						class="border-2 rounded-r-lg p-1 px-2 flex-1"
						bind:value={$signupForm.handle}
						{...$constraints.handle}
					/>
				</div>
				{#if $errors.handle}
					<p class="text-red-500">{$errors.handle}</p>
				{/if}
			</div>
		</div>

		<div class="flex flex-col flex-1 mb-2">
			{#if $errors.password}
				<p class="text-red-500">{$errors.password}</p>
			{/if}
			<label for="password">Password</label>
			<input
				name="password"
				id="password"
				type="password"
				placeholder="*********"
				class="border-2 rounded-lg p-1 px-2"
				bind:value={$signupForm.password}
				{...$constraints.password}
			/>
		</div>
		<!-- 
        <div class="flex  gap-4">
            <button
            {...$root}
            use:root
            class="flex h-5 w-6 appearance-none items-center justify-center
                    rounded  text-white shadow-lg hover:opacity-75 border border-gray-400"
            class:checked={$isChecked}
            id="checkbox"
            >
            {#if $isChecked}
                <Check size={16}/>
            {/if}
            <input  {...$input} use:input />
            </button>
            <label class="text-sm inline-block -mt-1 text-black" for="checkbox">
            Yes, I understand and agree to the Terms of Service , including the User Agreement and Privacy Policy .
            </label>
        </div> -->

		<button class="bg-green-600 w-full py-2 text-white font-semibold rounded-full">
			Create my account
		</button>

		<p class="text-center">
			Already have an account?
			<a href="/signin" class="text-blue-500 underline">Log In</a>
		</p>
	</div>
</form>

<!-- <SuperDebug data={$signupForm} /> -->

<style lang="postcss">
	.checked {
		@apply bg-blue-500;
	}
</style>

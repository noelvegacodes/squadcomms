<script lang="ts">
	import { enhance } from '$app/forms';

	import { ImagePlus, X } from 'lucide-svelte';

	import { createFocus } from './thing';
	import { faker } from '@faker-js/faker/locale/af_ZA';

	const { focus: focusName, isFocused: nameFocused } = createFocus();
	const { focus: focusBio, isFocused: bioFocused } = createFocus();
	const { focus: focusLocation, isFocused: locationFocused } = createFocus();
	const { focus: focusWeather, isFocused: weatherFocused } = createFocus();
</script>

<div class="fixed inset-0 z-50 bg-slate-800/50" />

<div
	class="bg-slate-950 text-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-50 max-w-2xl w-full p-4"
>
	<header class="flex gap-4 mb-8">
		<button><X size={20} /></button>
		<h2 class="text-xl font-semibold">Edit profile</h2>
		<form method="post" class="ml-auto" use:enhance>
			<button
				type="submit"
				class="bg-slate-100 text-slate-950 py-1 px-4 rounded-full hover:bg-slate-200 transition-colors duration-200 font-semibold"
				>Save</button
			>
		</form>
	</header>
	<main>
		<form method="post" use:enhance class="flex flex-col gap-6">
			<div class="relative mb-10">
				<!-- Banner -->
				<div>
					<div class="h-52 bg-gray-500 rounded-xl overflow-hidden relative">
						<img src={faker.image.cats()} alt="user-banner" class="h-full w-full object-cover" />
					</div>
					<div
						class="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full"
					>
						<ImagePlus size={22} class="text-gray-700 " />
					</div>
				</div>
				<!-- Avatar -->
				<div
					class=" text-white text-lg font-semibold bg-purple-500 rounded-full h-24 w-24 flex items-center justify-center absolute -translate-y-1/2 left-10 shadow-lg overflow-clip"
				>
					<div class="w-full h-full relative">
						<img src={faker.image.city()} alt="user-avatar" class="h-full w-full" />
						<div
							class="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full"
						>
							<ImagePlus size={16} class="text-gray-700 " />
						</div>
					</div>
				</div>
				<!-- Edit Profile Button -->
			</div>
			<div class="border border-slate-700 rounded-lg p-2" class:focused={$nameFocused}>
				<label for="name" class="block text-white/70" class:whiteText={$nameFocused}>Name</label>
				<input
					id="name"
					name="name"
					type="text"
					use:focusName
					class="w-full outline-none bg-transparent"
				/>
			</div>
			<div class="border border-slate-700 rounded-lg p-2" class:focused={$bioFocused}>
				<label for="bio" class="block text-white/70" class:whiteText={$bioFocused}>Bio</label>
				<input
					id="bio"
					name="bio"
					type="text"
					use:focusBio
					class="w-full outline-none bg-transparent"
				/>
			</div>
			<div class="border border-slate-700 rounded-lg p-2 h-16" class:focused={$locationFocused}>
				<label for="location" class="block text-white/70" class:whiteText={$locationFocused}
					>Location</label
				>
				<input
					id="location"
					name="location"
					type="text"
					use:focusLocation
					class="w-full outline-none bg-transparent"
				/>
			</div>
			<div class="border border-slate-700 rounded-lg p-2 h-16" class:focused={$weatherFocused}>
				<label for="location" class="block text-white/70" class:whiteText={$weatherFocused}
					>Website</label
				>
				<input
					id="location"
					name="location"
					type="text"
					use:focusWeather
					class="w-full outline-none bg-transparent"
				/>
			</div>
		</form>
	</main>
</div>

<style lang="postcss">
	.focused {
		@apply border-amber-500;
	}

	.whiteText {
		@apply text-white;
	}
</style>

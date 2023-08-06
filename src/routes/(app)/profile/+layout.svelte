<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import { page } from '$app/stores';
	import { user } from '$lib/stores/mock/user';
	import { createDialog } from '@melt-ui/svelte';
	import { Calendar, ImagePlus, Search, X } from 'lucide-svelte';
	import { createFocus } from '$lib/use-actions/createFocus';
	import { superForm } from 'sveltekit-superforms/client';
	import { createImagePreviewer } from '$lib/actions/image-previewer';
	const { trigger, portal, overlay, content, title, description, close, open } = createDialog();
	let { focus: focusName, isFocused: nameFocused } = createFocus();
	let { focus: focusBio, isFocused: bioFocused } = createFocus();
	let { focus: focusLocation, isFocused: locationFocused } = createFocus();
	let { focus: focusWebsite, isFocused: websiteFocused } = createFocus();
	
	export let data;
	const { form, enhance } = superForm(data.form);
	
	// user data
	const { avatar, banner} = $user;
	// usage
	const {src: bannerImg, previewImage: prevBanner} = createImagePreviewer(data.banner);
	const {src: avatarImg, previewImage: prevAvatar} = createImagePreviewer(data.avatar);



</script>

<div class="wrapper">
	<div class="thing">
		<header class="h-16 border-b border-slate-700 sticky top-0 bg-slate-950 z-10" />

		<div class="overflow-y-auto">
			<!-- Profile bio -->
			<section class="p-6 border-b border-slate-700">
				<div class="relative">
					<!-- Banner -->
					<Banner src={data.banner} />
					<!-- Avatar -->
					<div
						class="absolute -translate-y-1/2 left-10"
					>
						<Avatar color="bg-amber-500" name={data.name} size="2xl" url={data.avatar} />
					</div>
					<!-- Edit Profile Button -->
					<button
						{...trigger}
						use:trigger
						class="text-white/90 hover:text-white absolute right-4 -bottom-12 border border-amber-500/50 hover:border-amber-500 hover:bg-amber-300/20 py-1 px-4 rounded-full z-10 transition-colors duration-100 font-semibold"
						>Edit profile</button
					>
				</div>

				<div class="pt-16 pb-6">
					<p class="mb-1 text-xl font-bold">{data.name}</p>
					<div class="mb-2 text-slate-300">@{data.handle} {data.location ?? ''}</div>

					<p class="mb-1">{data.bio ?? ''}</p>
					<a class="mb-2 text-sky-500 underline" href={data.website} target="_blank">{data.website ?? ''}</a>

					<p class="flex items-baseline gap-2 text-slate-300">
						<Calendar size={14} /> Joined {data.createdAt.toLocaleDateString('en-us', {
							month: 'long',
							year: 'numeric'
						})}
					</p>
				</div>
				<!-- Profile Tabs -->
				<div class="flex text-sm py-2 gap-4">
					<a href="#" class="flex gap-2">
						328 <span>following</span>
					</a>
					<a href="#" class="flex justify-center gap-2">
						<div>328 <span>followers</span></div>
					</a>

				</div>
			</section>

			<!-- Profile section tabs -->
			<section class="flex h-14 sticky -top-1 border-b z-10 border-slate-700 bg-slate-950">
				<a
					href="/profile"
					class="flex-1 text-center flex justify-center hover:bg-slate-900 transition-colors duration-200 h-full"
				>
					<div class="w-fit flex flex-col justify-between h-full">
						<div class="flex-1" />
						<div class="px-4">Timeline</div>
						<div class="flex-1" />
						<div
							class="h-0.5 mt-auto rounded-full"
							class:selected={$page.url.pathname.endsWith('/profile')}
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

			<!-- Selected Tab Section -->
			<section class="">
				<slot />
			</section>
		</div>
	</div>
	<aside class="px-4 py-4 ">
		<!-- TODO: make search component -->
		<div class="search hidden  items-center gap-2 px-4 py-2 border-slate-700 bg-slate-800 rounded-full">
			<Search size={16} class="text-slate-300" />
			<input type="text" placeholder="Search Buildstory" />
		</div>

		<div class="card  bg-slate-900 h-96 rounded-lg border border-slate-700" />
		<div class="card  bg-slate-900 h-96 rounded-lg border border-slate-700" />
	</aside>
</div>

<!-- Update Profile Form -->
<div use:portal>
	{#if $open}
		<div {...$overlay} use:overlay class="fixed inset-0 z-50 bg-slate-800/50" />

		<form
			{...$content}
			use:content
			method="post"
			use:enhance
			class="z-50 max-w-2xl w-full p-6 flex flex-col gap-6 bg-slate-950 text-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-xl"
			action="?/update"
		>
		<!-- <SuperDebug data={$form} /> -->
			<header  class="flex gap-4 mb-8">
				<button {...$close} use:close><X size={20} /></button>
				<h2 {...$title} use:title class="text-xl font-semibold">Edit profile</h2>
				<button
					type="submit"
					class="bg-slate-100 ml-auto text-slate-950 py-1 px-4 rounded-full hover:bg-slate-200 transition-colors duration-200 font-semibold"
					>Save</button
				>
			</header>
			<!-- Images section -->
			<section class="relative mb-20">
				<!-- Banner -->
				<div class="h-52 rounded-xl overflow-clip relative">
					<!-- <img src={$bannerImg} alt="user-banner" class="h-full w-full object-cover"  /> -->
					<Banner src={$bannerImg} />
					
					<label for="banner" class="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full cursor-pointer">
						<ImagePlus size={22} class="text-black" />
					</label>
					<input type="file" id="banner" name="banner" accept="image/*" hidden use:prevBanner/>
				</div>
				<!-- Avatar -->
				<div class="absolute -translate-y-1/2 left-10 ">
					<div class=" relative  ">
						<Avatar size="2xl" url={$avatarImg} name={data.name} color="bg-amber-500" />
						<!-- <img src={$avatarImg} alt="user-avatar" class="h-full w-full" /> -->
						<label for="avatar" class="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500/30 p-3 rounded-full cursor-pointer">
							<ImagePlus size={22} class="text-black " />
						</label>
						<input type="file" id="avatar" hidden name="avatar" accept="image/*" use:prevAvatar />
					</div>
				</div>
			</section>

			<section class="flex flex-col gap-6">
				<div class="border border-slate-700 rounded-lg p-2" class:focused={$nameFocused}>
					<input hidden name="id" value={$form.id} />
					<label for="name" class="block text-white/70" class:whiteText={$nameFocused}>Name</label>
					<input
						id="name"
						name="name"
						type="text"
						use:focusName
						class="w-full outline-none bg-transparent"
						bind:value={$form.name}
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
						bind:value={$form.bio}
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
						bind:value={$form.location}
					/>
				</div>
				<div class="border border-slate-700 rounded-lg p-2 h-16" class:focused={$websiteFocused}>
					<label for="website" class="block text-white/70" class:whiteText={$websiteFocused}
						>Website</label
					>
					<input
						id="website"
						name="website"
						type="text"
						use:focusWebsite
						class="w-full outline-none bg-transparent"
						bind:value={$form.website}
					/>
				</div>
			</section>
		</form>
	{/if}
</div>

<style lang="postcss">
	.wrapper {
		/* @apply h-[100dvh]; */
		display: grid;
		grid-template-columns: 1fr;
		overflow: hidden;
		/* @apply border-4 border-red-500; */
	}
	.thing {
		display: grid;
		grid-template-rows: 64px 1fr;
		overflow: hidden;
		@apply border-r border-slate-700;
	}

	aside {
		display: none;
	}

	.follow-bar {
		& a {
			@apply py-2;
		}
	}

	.selected {
		@apply bg-amber-500;
	}

	.focused {
		@apply border-amber-500;
	}

	.whiteText {
		@apply text-white;
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
		.search input {
			background-color: transparent;
		}
	}
</style>

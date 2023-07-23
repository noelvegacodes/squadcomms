<script lang="ts">


	import { Antenna, ChevronRight, ListTodo, Plus } from 'lucide-svelte';
	import DropdownTrigger from '$lib/components/DropdownTrigger.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownContent from '$lib/components/DropdownContent.svelte';

</script>

<div class="app-container w-full h-screen overflow-hidden">
	<header class="flex justify-between items-center">
		<p class="font-bold text-2xl text-blue-600">Squadcomms</p>

		<div class="h-6 w-6 bg-pink-700 rounded-full grid place-content-center text-white text-xs">
			NV
		</div>
	</header>
		
	<!-- <section class="projects">
		<a href="/" class="w-10 h-10 bg-gray-200 rounded-lg grid place-content-center">
			<svg class="fill-black h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg
			>
		</a>
		<button class="w-10 h-10 rounded-lg grid place-content-center border border-black">
			<Plus size={32} />
		</button>
	</section> -->

	<section class="side-nav">
		<div class="select w-full h-14 border-b-2">
			<button
				class="trigger h-full pl-6 hover:bg-gray-200 rounded flex items-center justify-between"
			>
				Project Name
			</button>
		</div>
		<!-- <a href="/" class="label"> Check in </a> -->
		<!-- <a href="/" class="label"> Activity </a> -->
		<Dropdown let:open class="sidenav-dd">
			<DropdownTrigger>
				Channels
				<ChevronRight
					size={20}
					class="ml-auto"
					style="transform: {open ? 'rotate(90deg)' : ''}; transition: all 200ms"
				/>
			</DropdownTrigger>

			<DropdownContent>
				{#each ['Product Design', 'Web Development', 'Marketing'] as link}
					<a href="/project/90210/channel/{link}/comms"> <Antenna size={16} /> {link}</a>
				{/each}
			</DropdownContent>
		</Dropdown>

		<Dropdown let:open class="sidenav-dd">
			<DropdownTrigger>
				Tasks
				<ChevronRight
					size={20}
					class="ml-auto"
					style="transform: {open ? 'rotate(90deg)' : ''}; transition: all 200ms"
				/>
			</DropdownTrigger>

			<DropdownContent>
				{#each [1, 2, 3] as link}
					<a href="/"> <ListTodo size={16} /> link {link}</a>
				{/each}
			</DropdownContent>
		</Dropdown>

		<a href="/" class="label"> Files </a>
		<a href="/" class="label"> Team </a>


		<Dropdown let:open class="sidenav-dd">
			<DropdownTrigger>
				Direct Messages
				<ChevronRight
					size={20}
					class="ml-auto"
					style="transform: {open ? 'rotate(90deg)' : ''}; transition: all 200ms"
				/>
			</DropdownTrigger>

			<DropdownContent>
				{#each ['Jack', 'Lindsey', 'Adam'] as link}
					<a href="/"> <span class="h-6 w-6 bg-rose-500 rounded-full" />{link}</a>
				{/each}
			</DropdownContent>
		</Dropdown>
	</section>

	<slot />

</div>

<style lang="postcss">

	.app-container {
		display: grid;
		grid-template-columns: 250px 1fr;
		grid-template-rows:  50px auto;
	}
	header {
		@apply border-b-2;
		grid-column: 1 / 4;
		padding-inline: 20px;
	}

	.projects {
		@apply py-2 flex flex-col items-center gap-2 border-r;
	}

	.side-nav {
		width: 250px;
		/* padding: 10px; */
		display: flex;
		flex-direction: column;
		gap: 10px;
		@apply bg-gray-100 text-sm border-r;
	}


	:global(.sidenav-dd) {
		@apply text-black;

		& .trigger {
			@apply flex gap-4 items-center w-full font-semibold  text-left rounded hover:bg-gray-200 p-2 pl-6;
		}

		& .content {
			@apply flex flex-col    rounded overflow-clip mt-2;

			& a {
				@apply flex items-center gap-3  hover:bg-gray-200 p-2 pl-4 text-sm;
			}
		}
	}

	.trigger {
		@apply text-black w-full text-left;
	}

	.label {
		@apply flex gap-4 text-sm items-center w-full font-semibold text-black text-left hover:bg-gray-200 p-2 pl-6;
	}
</style>

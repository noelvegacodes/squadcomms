<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownContent from '$lib/components/DropdownContent.svelte';
	import DropdownTrigger from '$lib/components/DropdownTrigger.svelte';
</script>

<Dropdown let:open class="sidenav-dd">
	<DropdownTrigger>Click me</DropdownTrigger>

	<DropdownContent>
		<a href="/" role="menuitem" tabindex="0" class="text-black">link 1</a>
		<a href="/" role="menuitem" tabindex="0" class="text-black">link 2</a>
		<a href="/" role="menuitem" tabindex="0" class="text-black">link 3</a>
	</DropdownContent>
</Dropdown>

<style lang="postcss">
	:global(.sidenav-dd) {
		border: 1px solid black;
	}
	:global(.sidenav-dd .trigger) {
		@apply text-white h-10 px-10 flex rounded items-center justify-between gap-4 outline-white bg-blue-600;
	}

	:global(.sidenav-dd .content) {
		@apply bg-red-500;
	}
</style>

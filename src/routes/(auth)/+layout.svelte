<script>

	import { BookOpenCheck } from "lucide-svelte";

</script>
<div class="wrapper">
	<header class="p-6 max-w-7xl w-full mx-auto">
		<a href="/" class="logo flex gap-2 text-2xl items-center">
			<BookOpenCheck size={24} class="text-amber-500  " />
			<span class="leading-none font-bold text-white">Buildstory</span>
		</a>
	</header>

<slot />
</div>
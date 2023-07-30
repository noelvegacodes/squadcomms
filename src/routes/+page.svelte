<script>
	import { invalidate, invalidateAll } from "$app/navigation";
	import RickRoll from "$lib/images/rickroll.gif"
	import { onMount } from "svelte";

	onMount(() => {
		invalidateAll()
	})
</script>

<div class="flex justify-center mt-20">
	<div class="h-96 w-96">
		<img src={RickRoll} alt="rick rolled" class="h-full" />
	</div>
</div>
<script>
    import {page} from '$app/stores';
	import { onMount } from 'svelte';
</script>

<div class="flex-col justify-center items-center">
    <h1 class="text-white text-center mt-28 mb-10 text-xl"> {$page.error?.message ?? "Oops... look like there is an error with your request"}</h1>
    
    <div class="flex justify-center">
        <button class="text-center text-xl bg-amber-500 py-1 px-4 rounded-full" on:click={() => history.go(-1)}>Back</button>
    </div>
</div>
<script lang="ts">
	import { enhance } from '$app/forms';
	import { Info, Send } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
</script>

<form in:fly method="post" use:enhance class="bg-white p-4 rounded-lg w-full flex gap-2 items-center" action="?/resend">
	<Info size={20} />
	<p class=" font-semibold">Success! Confirm your email before logging in!</p>
	<button type="submit" class="bg-slate-950 text-white py-1 px-4 rounded-lg ml-auto flex items-center gap-4">resend</button>
</form>
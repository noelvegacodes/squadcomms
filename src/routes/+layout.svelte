<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import {  invalidateAll } from '$app/navigation';
    import '../app.postcss';
	import './styles.css';

    export let data;

</script>

<nav class="flex justify-between p-4 border-b">
    <a href="/">Build Story</a>
    <ul class="flex gap-6">
        {#if data.accountSession}
            <form method="POST" use:enhance={() => {
                return async ({result}) => {
                    invalidateAll();
                    await applyAction(result)
                }
            }} action="/logout">
                <button type="submit" on:click={() => invalidateAll()} class="border-r pr-2">Log out</button>
            </form>
            <a href="/protected">Profile</a>
        {:else}
            <a href="/signup">Sign up</a>
            <a href="/login">Login</a>
        {/if}
    </ul>
</nav>
<slot />
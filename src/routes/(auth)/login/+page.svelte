<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';


    export let data;
    const {form: loginForm, errors, constraints, enhance, message} = superForm(data.loginForm, {
        onUpdated({form}) {
            if (form.valid) {
                console.log("redirect");
                goto('/protected')
            }
        }
    })


</script>

<form method="POST" use:enhance>
    {#if $message}<p class="text-red-500">{$message}</p>{/if}
    <label for="email">Email</label>
    <input type="email" name="email" placeholder="Inzo@example.com" bind:value={$loginForm.email} required />

    <label for="password">Password</label>
    <input type="password" name="password" placeholder="******" required bind:value={$loginForm.password} />
    
    <button class="bg-slate-900 text-white py-1 px-4 rounded" type="submit">Login</button>
    <p>Dont have an account ? <a href="/signup" class="text-blue-500 underline">Sign up</a></p>
</form>


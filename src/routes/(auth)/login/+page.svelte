<script lang="ts">
	import { isEmpty } from '$lib/utils.js';
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

<form method="POST" use:enhance  class="border-2 max-w-2xl mx-auto p-10 rounded-lg mt-20" >
    {#if !isEmpty($errors)}<p class="text-red-500">Invalid form input</p>{/if}
    {#if $message}<p class="text-red-500">{$message}</p>{/if}

    <div class="flex flex-col gap-4 ">
        <div class="flex gap-10">
            <div class="flex flex-col flex-1">
                <label for="email">Email</label>
                <input name="email" id="email" type="text" placeholder="Rick.Astley@example.com" class="border-2 rounded-lg p-1 px-2" bind:value={$loginForm.email} {...$constraints.email} />
            </div>

        
        </div>

        <div class="flex flex-col flex-1 mb-2">
            <label for="password">Password</label>
            <input name="password" id="password"  type="text" placeholder="*********" class="border-2 rounded-lg p-1 px-2" bind:value={$loginForm.password} {...$constraints.password} />
        </div>


        <button class="bg-green-600 w-full py-2 text-white font-semibold rounded-full">
            Login
        </button>

        <div>
            <p class="text-sm">Forget your password? <a href="/forget-password" class="text-blue-500 hover:underline"> Reset password</a></p>
        </div>
    </div>
</form>

<style lang="postcss">
    .checked {
        @apply bg-blue-500;
    }
</style>


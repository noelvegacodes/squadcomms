<!-- <script lang="ts">
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
</form> -->


<script lang="ts">
    import { createCheckbox } from '@melt-ui/svelte'
    import {AtSign, Check} from 'lucide-svelte';
    const { root, input, isChecked } = createCheckbox({ checked: 'indeterminate' });
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
        <!-- <div class="flex gap-10">
            <div class="flex flex-col flex-1">
                <label for="firstName">First name</label>
                <input name="firstName" id="firstName" type="text" placeholder="Rick" class="border-2 rounded-lg  p-1 px-2" bind:value={$signupForm.firstName} {...$constraints.firstName} />
            </div>
            <div class="flex flex-col flex-1">
                <label for="lastName">Last name</label>
                <input name="lastName" id="lastName" type="text" placeholder="Astley" class="border-2 rounded-lg p-1 px-2" bind:value={$signupForm.lastName} {...$constraints.lastName} />
            </div>
        </div> -->
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
    </div>
</form>
<!-- <SuperDebug data={$signupForm} /> -->


<style lang="postcss">
    .checked {
        @apply bg-blue-500;
    }
</style>


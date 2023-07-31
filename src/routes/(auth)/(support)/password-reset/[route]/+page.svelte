<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

    export let  data;
    const {passwordResetSession} = data
    const { form, message, errors, constraints, enhance, } = superForm(data.passwordResetForm, {
    onUpdated({form}) {
        if (form.valid) {
            console.log("redirect")
            // goto('/login');
        }
    }
    });
</script>


{#if data.passwordResetSession}
    <div class="max-w-2xl w-full mx-auto py-10">
    <div >
        
        <p class="mb-8">Forget your password?</p>
        <form method="POST" use:enhance  class="border-2  p-10 rounded-lg" >
            <div class="flex gap-10 mb-2">
                <div class="flex flex-col flex-1">
                    <label for="password">New Password</label>
                    <input name="password" id="password" type="password" placeholder="******" class="border-2 rounded-lg p-1 px-2" bind:value={$form.password} {...$constraints.password} />
                    <!-- <input name="accountId" id="accountId" hidden  class="border-2 rounded-lg p-1 px-2"  bind:value={$form.accountId} {...$constraints.accountId} /> -->
                </div>

            </div>
        
        <button type="submit" class="text-white bg-slate-500 py-1 p-4 rounded-lg">Reset Password</button>
        
        </form>
    </div>

</div>
{:else}
    <p>password reset expired</p>
{/if}
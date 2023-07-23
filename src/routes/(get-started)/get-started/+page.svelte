<script>
    import { createCheckbox } from '@melt-ui/svelte'
    import {Check} from 'lucide-svelte';
    import GoogleLogoSmall from '$lib/images/logos/google-logo-sm.svg'
    const { root, input, isChecked, isIndeterminate } = createCheckbox({
    checked: 'indeterminate',
  });
</script>

<nav class="max-w-[90rem] mx-auto mb-20 h-14 flex items-center">
    <a href="/" class="text-blue-500 text-2xl font-semibold ">Squadcomms</a>
</nav>

<form class="border-2 max-w-2xl mx-auto p-10 rounded-lg">
    <h2 class="text-center text-3xl font-semibold mb-4">Sign up to find your squad</h2>

    <button class="bg-blue-500 w-full py-2 text-white font-semibold rounded-full relative">
        <div class="bg-white h-8 w-8 p-2 rounded-full absolute top-1 left-1">
            <img src={GoogleLogoSmall} alt="Google logo letter" />
        </div>
        Continue with Google
    </button>

    <div class="my-6 flex items-center gap-4 text-gray-500 text-lg">
        <div class="h-0.5 flex-1 bg-gray-200 rounded"/>
        or
        <div class="h-0.5 flex-1 bg-gray-200 rounded"/>
    </div>

    <div class="flex flex-col gap-4 ">
        <div class="flex gap-10">
            <div class="flex flex-col flex-1">
                <label for="fname">First name</label>
                <input name="fname" id="fname" type="text" placeholder="John" class="border-2 rounded-lg p-1 px-2" />
            </div>
            <div class="flex flex-col flex-1">
                <label for="lname">Last name</label>
                <input name="lname" id="lname" type="text" placeholder="John" class="border-2 rounded-lg p-1 px-2" />
            </div>
        </div>
        <div class="flex flex-col flex-1">
            <label for="email">Email</label>
            <input name="email" id="email" type="text" placeholder="John" class="border-2 rounded-lg p-1 px-2" />
        </div>
        <div class="flex flex-col flex-1 mb-2">
            <label for="password">Password</label>
            <input name="password" id="password" type="text" placeholder="John" class="border-2 rounded-lg p-1 px-2" />
        </div>

        <div class="flex  gap-4">
            <button
            {...$root}
            use:root
            class="flex h-5 w-6 appearance-none items-center justify-center
                    rounded  text-white shadow-lg hover:opacity-75 border border-gray-400"
            class:checked={$isChecked}
            id="checkbox"
            >
            {#if $isChecked}
                <Check size={16}/>
            {/if}
            <input  {...$input} use:input />
            </button>
            <label class="text-sm inline-block -mt-1 text-black" for="checkbox">
            Yes, I understand and agree to the Upwork Terms of Service , including the User Agreement and Privacy Policy .
            </label>
        </div>

        <button class="bg-green-600 w-full py-2 text-white font-semibold rounded-full">
            Create my account
        </button>

        <p class="text-center">Already have an account?
            <a href="/" class="text-blue-500 underline">Log In</a>
        </p>
    </div>
</form>


<style lang="postcss">
    .checked {
        @apply bg-blue-500;
    }
</style>
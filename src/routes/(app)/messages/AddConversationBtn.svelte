<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import { Check, MailPlus, Search, Undo2, Users, X } from 'lucide-svelte';
	import { createDialog } from '@melt-ui/svelte'
	import { createSearch } from '$lib/actions/useSearch'
	import { createFocus } from '$lib/use-actions/createFocus'
	import { enhance } from '$app/forms';
	const {focus, isFocused} = createFocus();
	const {trigger, content, overlay, open, close, portal} = createDialog();

	let conversationType: "dm" | "group" = "dm";
	let participants: User[] = []
	const addParticipant = (user: User) => {
		participants = [...participants, user];
	}
	const removeParticipant = (user: User) => {
		participants = participants.filter(u => u.handle !== user.handle);
	}

	const clearParticipants = () => {
		participants = [];
		conversationType = "dm"
	}

	const createConversation = () => {
		console.log("Create conversation:", participants)
	}

	type User = {
		name: string, 
		avatar: string, 
		handle: string
	}
	
	async function searchUsers(value: string): Promise<User[]> {
		const response = await fetch('/stage?search='+value);
		return await response.json();
	}
	
	const {results, term, search} = createSearch([], searchUsers)
	$: if(!$open) {
		conversationType = "dm"
		$results = []
	}

    $: console.log("TERM: ", $term)
</script>

<button {...$trigger} use:trigger>
    <MailPlus size={18} />
</button>

<div use:portal class="px-4">
{#if $open}
	<div {...$overlay} use:overlay  class="overlay">
		<div {...$content} use:content class="modal">
			<header class="p-3 pb-0 ">
				<div  class="flex gap-3 mb-2">
					{#if conversationType === "dm"}
						<button {...$close} use:close class="back-btn">
							<X size={20} />
						</button>
						<p>New Conversation</p>
					{:else}
						<button on:click={clearParticipants} class="back-btn">
							<Undo2 size={20} />
						</button>
						<p>Create a group</p>
					{/if}
					<form method="POST" use:enhance class="ml-auto">
						<button on:click={createConversation} disabled={participants.length === 0}>Next</button>
					</form>
				</div>
			</header>

			<div class="flex items-center gap-4 border-slate-700 px-5">
				<label for="search">
					<Search size={16} class=" {$isFocused ? "text-amber-500" : "text-slate-300"}" />
				</label>
				<input id="search" placeholder="Search people" name="search"  type="text" class="text-white bg-transparent outline-none flex-1" use:focus use:search />
			</div>
			<ul class="participants">
                {#each participants as user}
                    <li>
                        <button on:click={() => removeParticipant(user)} class=" ">
                            {user.name}
                            <X size={16} class="text-amber-500" />
                        </button>
                    </li>
                {/each}
			</ul>

			{#if conversationType === "dm"}
				<button on:click={() => conversationType = "group"} class="group-btn">
					<div class="p-3 border rounded-full w-fit ">
						<Users size={16} />
					</div>
					<span  class="font-semibold">Create a group</span>
				</button>
			{/if}

			<ul class="divide-y divide-slate-700">
                {#each $results as user}
                    {@const isParticipant = participants.find(u => u.handle === user.handle)}
                    <li class=" hover:bg-slate-900 transition-colors duration-200">
                        <button on:click={() => { 
                                $term = "";
                                isParticipant ? removeParticipant(user) : addParticipant(user);
                            }}  class="p-4 w-full">
                            <div class="flex gap-4 items-center">
                                <Avatar  color="bg-blue-500" name={user.name} size="md" url={user.avatar}/>
                                <div>
                                    <p class="font-semibold -mb-1 text-white">{user.name}</p>
                                    <p class="text-sm text-slate-300">@{user.handle}</p>
                                </div>
                                {#if isParticipant}
                                    <Check size={16} class="ml-auto text-amber-500"/>
                                {/if}
                            </div>
                        </button>
                    </li>
                {/each}
                
			</ul>
		</div>
	</div>
{/if}
</div>

<style lang="postcss">
    .overlay {
        @apply w-full h-full fixed top-0 left-0 flex items-center justify-center z-50 px-4 bg-slate-600/10;
    }

    .modal {
        @apply max-h-[70vh] h-full w-full max-w-xl  rounded-2xl border border-slate-700 text-slate-100 bg-slate-950;
    }

    .back-btn {
        @apply p-1 rounded-full hover:bg-slate-500/20 transition-colors duration-200;
    }

    header p {
        @apply font-semibold text-lg;
    }

    form button {
        @apply py-1 px-4 rounded-full text-slate-900 bg-white font-semibold disabled:bg-white/80;
    }

    .group-btn {
        @apply flex items-center gap-6 p-4 w-full text-amber-500 border-b border-slate-700 hover:bg-slate-900 transition-colors duration-200;
    }

    .participants {
        @apply flex gap-2 p-4 pb-1 border-b border-slate-700;
    }

    .participants li {
        @apply border border-slate-700 rounded-full p-0.5 px-2 hover:bg-slate-900 transition-colors duration-200;
    }

    .participants li button {
        @apply w-full flex items-center gap-2;
    }
</style>
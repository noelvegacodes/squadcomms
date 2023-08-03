<script lang="ts">
	import { page } from '$app/stores';
	import { BellRing, BookOpenCheck, Home, ListTodo, Mail, User } from 'lucide-svelte';
	$: pathname = $page.url.pathname;
</script>

<div class="wrapper">
    <nav>
        <a href="/home" class="logo w-full">
            <BookOpenCheck size={24} class="text-amber-500 " />
            <span>Buildstory</span>
        </a>
        <ul class="">
            <li>
                <a href="/home" class="" class:selected={pathname.startsWith('/home')}>
                    <Home size={24} />
                    <span>Home</span>
                </a>
            </li>
            <li>
                <a href="/notifications" class:selected={pathname.startsWith('/notifications')}>
                    <BellRing size={24} />
                    <span>Notifcations</span>
                </a>
            </li>
            <li>
                <a href="/messages" class:selected={pathname.startsWith('/messages')}>
                    <Mail size={24} />
                    <span>Messages</span>
                </a>
            </li>
            <li>
                <a href="/projects" class:selected={pathname.startsWith('/projects')}>
                    <ListTodo size={24} />
                    Projects
                </a>
            </li>
            <li>
                <a href="/profile/timeline" class:selected={pathname.startsWith('/profile')}>
                    <User size={24} />
                    <span>Profile</span>
                </a>
            </li>
        </ul>
    </nav>

	<slot />
</div>

<style lang="postcss">
	.wrapper {
		display: grid;
		grid-template-columns: 200px 1fr;
		@apply h-full max-w-7xl mx-auto overflow-hidden;
		@apply text-white ;
        /* for debuggin */
        /* @apply border border-red-500; */
	}

    nav {
        @apply flex flex-col items-end border-r border-slate-700;

        & .logo {
            @apply h-16 flex items-center gap-4 px-4 border-b border-slate-700;
            & span {
                @apply text-2xl font-bold;
            }
        }

        & ul  {
            @apply flex flex-col w-full gap-2 py-2 text-slate-200;
            & a {
                @apply rounded-full text-lg;
                @apply flex items-center p-4 gap-4 w-fit border border-transparent hover:border-slate-700;
            }
        }    
    }

    .selected {
        @apply text-white font-semibold;
    }

</style>

    <script lang="ts">

	import { Antenna, BellRing, ChevronLeft, ChevronRight, Globe, ListTodo, Mails, Menu, Newspaper, Search, User,} from 'lucide-svelte';
	import DropdownTrigger from '$lib/components/DropdownTrigger.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownContent from '$lib/components/DropdownContent.svelte';
    import ProfileImg from '$lib/images/person/alex.jpg'
    import Amir from '$lib/images/person/amir.jpg'
    import Amy from '$lib/images/person/amy.jpg'
    import Annie from '$lib/images/person/annie.jpg'

</script>

<div class="app-container w-full h-full overflow-hidden">


	<section class="side-nav">
        <header class="grid place-content-center lg:flex lg:justify-between lg:items-center border-b px-2 border-slate-600 ">
            <a href="/" class="font-semibold text-xl text-white hidden lg:block">Squadcomms</a>
            
            <button class="grid place-content-center lg:hidden">
                <Menu size={20} />
            </button>

        </header>

        <!-- Main Menu -->
        <div class="flex items-center justify-center lg:justify-start lg:pl-10 gap-4 label">
            <User size={20} />
            <a href="/profile" class=" capitalize hidden lg:flex w-full">Profile</a>
        </div>

        <div class="flex items-center justify-center lg:justify-start lg:pl-10 gap-4 label">


            <Newspaper size={20} />
            <a href="/feed" class=" capitalize hidden lg:flex  w-full">Feed</a>
        </div>

        <div class="flex items-center justify-center lg:justify-start lg:pl-10 gap-4 label">


            <Mails size={20} />
            <a href="/feed" class=" capitalize hidden lg:flex  w-full">Messages</a>
        </div>


        <!-- Explore -->
        <div class="flex items-center label justify-center lg:justify-start">
            <Globe size={20} />
            <Dropdown let:open class="hidden lg:block"  >
                <DropdownTrigger>
                    Explore
                    <ChevronRight
                        size={20}
                        class="ml-auto"
                        style="transform: {open ? 'rotate(90deg)' : ''}; transition: all 200ms"
                    />
                </DropdownTrigger>
    
                <DropdownContent>
                    {#each ['jobs', 'groups', 'events', 'freelancers'] as link}
                        <a href="/{link}" class="label capitalize"> {link}</a>
                    {/each}
                </DropdownContent>
            </Dropdown>
        </div>

        <!-- Projects -->
        <div class="flex items-center label justify-center lg:justify-start">
            <Globe size={20} />
            <Dropdown let:open >

                <DropdownTrigger >
                    Projects
                    <ChevronRight
                                size={20}
                                class="ml-auto"
                                style="transform: {open ? 'rotate(90deg)' : ''}; transition: all 200ms"
                            />
                </DropdownTrigger>


                <DropdownContent>
                    <Dropdown let:open >
                        <DropdownTrigger>
                            Channels
                            <ChevronRight
                                size={20}
                                class="ml-auto"
                                style="transform: {open ? 'rotate(90deg)' : ''}; transition: all 200ms"
                            />
                        </DropdownTrigger>

                        <DropdownContent>
                                {#each ['Product Design', 'Web Development', 'Marketing'] as link}
                                    <a href="/project/{link}/channel/{link}/comms" class="label flex gap-2 items-center"> <Antenna size={16} /> {link}</a>
                                {/each}
                        </DropdownContent>
                    </Dropdown>


                    <Dropdown let:open >
                        <DropdownTrigger>
                            Tasks
                            <ChevronRight
                                size={20}
                                class="ml-auto"
                                style="transform: {open ? 'rotate(90deg)' : ''}; transition: all 200ms"
                            />
                        </DropdownTrigger>

                        <DropdownContent>
                            {#each [1, 2, 3] as link}
                                <a href="/" class="trigger label"> <ListTodo size={16} /> link {link}</a>
                            {/each}
                        </DropdownContent>
                    </Dropdown>

                    <a href="/" class=" trigger .label"> Files </a>
                    <a href="/" class=" trigger .label"> Team </a>


                </DropdownContent>
            </Dropdown>
		</div>
        <!-- Direct Messages -->
        <Dropdown let:open >
            <DropdownTrigger>
                Direct Messages
                <ChevronRight
                    size={20}
                    class="ml-auto"
                    style="transform: {open ? 'rotate(90deg)' : ''}; transition: all 200ms"
                />
            </DropdownTrigger>

            <DropdownContent>
                {#each [{name: 'John', img: Amir},{name: 'Annie', img: Annie}, {name: 'Sandra', img: Amy}] as user}
                    <a href="/"> <div class="h-8 w-8 bg-rose-500 rounded-full overflow-clip" >
                        <img src={user.img} alt="profile" class="h-full w-full" />
                    </div>{user.name}</a>
                {/each}
            </DropdownContent>
        </Dropdown>


	</section>

    <div class="flex  items-center border-b gap-8 px-8">

        <div class="border rounded flex">
            <button class="h-full flex items-center border-r p-1"><ChevronLeft size={18} /></button>
            <button class="h-full flex items-center p-1"><ChevronRight size={18} /></button>
        </div>
        <div class="flex relative w-96">
            <input type="text" placeholder="Type for search" class="border-2 p-0.5 pl-8 rounded w-full"/>
            <Search size={18} class="absolute top-2 left-2 text-gray-400"/>
        </div>


            <!-- <button class="flex items-center gap-2 ml-auto relative">
                <BellRing size={16} />
                <p class="text-sm">Notifications</p>
                <div class="h-3 w-3 bg-blue-500 text-white grid place-content-center rounded-full text-xs absolute left-1.5 -top-1 border-2 border-white"></div>
            </button> -->
            <div class="h-8 w-8 rounded-full overflow-clip ml-auto"><img src={ProfileImg} alt="profile" /></div>

    </div>

    <slot />


</div>

<style lang="postcss">

	.app-container {
		display: grid;
		grid-template-columns:  50px 1fr;
        grid-template-rows: 50px 1fr;


        @media (min-width: 1024px) {
            grid-template-columns: 250px 1fr;
        }
	}
	header {
		@apply border-b-2;
        height: 50px;
	}

	.side-nav {
        grid-row: 1 / 3;
		display: flex;
		flex-direction: column;
		/* gap: 10px; */
		@apply bg-slate-700 text-sm border-r text-white ;
	}


	/* :global(.side-nav) {
        
        & .trigger {
            @apply flex gap-4 items-center w-full  text-left rounded hover:bg-slate-600 p-2 ;
        }

        & .label {
            @apply  w-full  text-left rounded hover:bg-slate-600 p-2 ;

        }



		&  .content {
			@apply flex flex-col rounded overflow-clip pl-4;


		}

	}

    .sub-1 {
        @apply pl-4
    }

     */



</style>

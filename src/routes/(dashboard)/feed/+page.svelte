<script lang="ts">
    import UserProfileImg from '$lib/images/person/alex.jpg';
    import Amir from '$lib/images/person/amir.jpg'
    import Amy from '$lib/images/person/amy.jpg'
    import Annie from '$lib/images/person/annie.jpg'
    import {AutoResizeTextarea} from 'svelte-autoresize-textarea';
    import {Heart, Image, ListTodo, MapPin, MessagesSquare, MoreHorizontal, Repeat2, ScrollText, Share} from 'lucide-svelte';
</script>

<div class="bg-gray-100 px-8 flex gap-8 xl:pr-0">

    <!-- Feed Container -->
    <div class="max-w-[95rem] mx-auto mt-6">
        <!-- New Post Input -->
        <div class="  flex gap-2 bg-white p-4 rounded-lg mb-6 border">
            <div class="h-12 w-12 rounded-full overflow-clip">
                <img src={UserProfileImg} alt="profile" />
            </div>
    
            <div class=" flex-1">
                <div>
                    <AutoResizeTextarea placeholder="What is happening?!" class="resize-none w-full p-2 bg-transparent text-xl overflow-hidden outline-none"  />
                </div>
                <div class="border-t pt-4 flex justify-between">
    
                    <div class="text-gray-500  border-gray-300  flex items-center gap-4">
                        <button>
                            <Image size={20} />
                        </button>
                        <button>
                            <ListTodo size={20} />
                        </button>
                        <button>
                            <ScrollText size={20} />
                        </button>
                        <button>
                            <MapPin size={20} />
                        </button>
                    </div>
                    <button class="bg-blue-900 text-white px-4 py-1 rounded-full font-semibold">Post</button>
                </div>
            </div>
        </div>
    
    
        <!-- Feed -->
        <div class="flex flex-col">
            <article class="bg-white p-6 rounded-lg border">
                <header class="flex gap-4 items-center">
                    <div class="h-12 w-12 rounded-full overflow-clip">
                        <img src={Amy} alt="profile" />
                    </div>
                    <div class="flex flex-col">
                        <p class="font-semibold">Amy Harper</p>
                        <p class="text-sm text-gray-500">Thursday, Jun 31, 5:50 PM</p>
                    </div>
                    <button class="ml-auto self-start">
                        <MoreHorizontal size={20} />
                    </button>
                </header>
                <main class="pt-2 pb-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et dolores illum porro facere non ea! Iste quod necessitatibus repellendus at officia nesciunt magnam, voluptatibus cum nobis soluta quasi, dolore esse?
                </main>
                <footer class="">
                    <div class="border-y py-2 flex items-center justify-between">
    
                        <div class="flex">
                            <div class="h-6 w-6 bg-blue-500 rounded-full border border-white overflow-clip"><img src={UserProfileImg} alt="profile" /></div>
                            <div class="h-6 w-6 bg-blue-500 rounded-full -ml-2 border border-white overflow-clip" ><img src={Annie} alt="profile" /></div>
                            <div class="h-6 w-6 bg-blue-500 rounded-full -ml-2 border border-white overflow-clip"><img src={Amir} alt="profile" /></div>
                            <span class="text-gray-500 text-sm font-semibold ml-2">+ 245 likes</span>
                        </div>
                        <div class="flex gap-6">
                            <button class="flex items-center gap-2 group hover:text-rose-600 ">
                                <div class="grid place-content-center h-8 w-8 group-hover:bg-rose-50 rounded-full">
                                    <Heart size={18} class="" />
                                </div>
                                Like
                            </button>
                            <button class="flex items-center gap-2 group hover:text-emerald-600">
                                <div class="grid place-content-center h-8 w-8 group-hover:bg-emerald-50 rounded-full">
                                    <MessagesSquare size={18} class="" />
                                </div>
                                Comment
                            </button>
                            <button class="flex items-center gap-2 group hover:text-blue-600">
                                <div class="grid place-content-center h-8 w-8 group-hover:bg-blue-50 rounded-full">
        
                                <Share size={18} class="" />
                                </div>
                                Share
                            </button>
                        </div>
                    </div>
                </footer>
            </article>
        </div>
    </div>

    <div class="h-full w-52  shrink-0 mt-6  flex-col gap-4 hidden 2xl:flex">
        <article class="w-full h-72 bg-white rounded-lg border">
            <header class="px-4 py-2 font-semibold border-b">Upcoming Events</header>
        </article>

        <article class="w-full h-72 bg-white rounded-lg border">
            <header class="px-4 py-2 font-semibold border-b">Advertising</header>
        </article>
    </div>

    <div class="h-full w-52 bg-white shrink-0 border hidden xl:flex">

    </div>


</div>
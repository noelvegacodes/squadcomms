<script>
	import { ChevronDown } from 'lucide-svelte';
	import MicrosoftLogo from '$lib/images/logos/airbnb-ar21.svg';
	import GoogleLogo from '$lib/images/logos/google-ar21.svg';
	import LacosteLogo from '$lib/images/logos/adyen-ar21.svg';
	import Amir from '$lib/images/person/amir.jpg';
	import Alex from '$lib/images/person/alex.jpg';
	import Amy from '$lib/images/person/amy.jpg';
	import Annie from '$lib/images/person/annie.jpg';
	let navDrawerIsOpen = false;
	let nav = "";
	let findTalentHover = "";
</script>


<div class="border-b h-16">
	<div class="flex items-baseline max-w-[90rem] w-full mx-auto  h-full">
		<a href="/" class="text-blue-500 text-2xl font-semibold mr-16">Squadcomms</a>
	
		<nav class="h-full  flex items-center">
			<ul class="flex  h-full items-center" 
			on:mouseleave={() => {
				navDrawerIsOpen = false
			}}
				>
				<li class="h-full">
					<button class="flex items-center gap-1 group font-semibold h-full  px-4" 
					on:mouseenter={() => {
						nav = "Find Talent"
						navDrawerIsOpen = true

					}}
					>
						<span class="group-hover:text-blue-600">Find Talent</span> <ChevronDown size={16} class="group-hover:-rotate-180 transition-all duration-200 text-current"/>
					</button>
				</li>
				<li class="h-full">
					<button class="flex items-center gap-1 group font-semibold  h-full px-4" on:mouseenter={() => {
						nav = "Find Work"
						navDrawerIsOpen = true

					}}>
						<span class="group-hover:text-blue-600">Find Work</span> <ChevronDown size={16} class="group-hover:-rotate-180 transition-all duration-200 text-current"/>
					</button>
				</li>
			</ul>
		</nav>
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="relative border-b" id="" 
		on:mouseenter={() => navDrawerIsOpen = true}
		on:mouseleave={() => navDrawerIsOpen = false}
	
	>
		{#if navDrawerIsOpen && nav === 'Find Talent'}
		<div class="absolute bg-white w-full  z-[1] border-y shadow-lg rounded-b-xl pt-8 pb-16">
			<div class="max-w-7xl mx-auto flex ">

				<ul class="flex flex-col w-[300px] gap-2">

						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<li on:mouseover={() => findTalentHover = 'Marketplace'}>
							<a href="/" class="p-4 rounded-lg hover:bg-blue-50 block">
								<p class="font-semibold">Post a job and hire a pro</p>
								<p class="text-sm text-blue-500 font-semibold">Talent Marketplace</p>
							</a>
						</li>
						
						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<li on:mouseover={() => findTalentHover = 'Project'}>
							<a href="/" class="p-4 rounded-lg hover:bg-blue-50 block">
								<p class="font-semibold">Browse by project</p>
								<p class="text-sm text-blue-500 font-semibold">Project Catalog</p>
							</a>
						</li>

						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<li on:mouseover={() => findTalentHover = 'Consultation'}>
							<a href="/" class="p-4 rounded-lg hover:bg-blue-50 block">
								<p class="font-semibold">Get advice from an industry leader</p>
								<p class="text-sm text-blue-500 font-semibold">Consultations</p>
							</a>
						</li>
				</ul>
	
				<!-- svelte-ignore empty-block -->
				<div class="flex-1  h-full border-8">
					{#if findTalentHover === 'Consultation'}
						<div class="h-72 bg-blue-500">

						</div>
					{:else if findTalentHover === 'Project'}
						<div class="h-72 bg-red-500">

						</div>
					{:else}
						<div class="h-72 bg-yellow-500">

						</div>
					{/if}
				</div>
			</div>
		</div>
		{/if}

		{#if navDrawerIsOpen && nav === 'Find Work'}
		<div class="absolute bg-white w-full  z-[1] border-y shadow-lg rounded-b-xl pt-8 pb-16">
			<div class="max-w-7xl mx-auto flex ">
				<ul class="flex   gap-2 w-full">

						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<li class="flex-1" on:mouseover={() => findTalentHover = 'Marketplace'}>
							<a href="/" class="p-4 rounded-lg hover:bg-blue-50 block">
								<p class="font-semibold">Ways to earn</p>
								<p class="text-sm text-blue-500 font-semibold">Talent Marketplace</p>
							</a>
						</li>
						
						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<li class="flex-1" on:mouseover={() => findTalentHover = 'Project'}>
							<a href="/" class="p-4 rounded-lg hover:bg-blue-50 block">
								<p class="font-semibold">Find work for your skills</p>
								<p class="text-sm text-blue-500 font-semibold">Project Catalog</p>
							</a>
						</li>

						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<li class="flex-1" on:mouseover={() => findTalentHover = 'Consultation'}>
							<a href="/" class="p-4 rounded-lg hover:bg-blue-50 block">
								<p class="font-semibold">Find ways to promote yourself</p>
								<p class="text-sm text-blue-500 font-semibold">Consultations</p>
							</a>
						</li>
				</ul>
			</div>
		</div>
		{/if}
	</div>
</div>






<div class="max-w-7xl mx-auto pt-20">
	<section class="flex">
		<div class="w-1/2">

			<p class="font-semibold text-xl mb-4">What is Squadcomms ?</p>
			<h1 class="text-5xl font-semibold max-w-[700px] mb-10">
				The future of remote work and collaboration is here.
			</h1>
			<div class="border-l-4 border-blue-600 pl-10 py-4 mb-20 ">
				<p class="text-xl  font-semibold max-w-[600px] mb-12">
					Hiring remote workers allows access to a diverse talent pool worldwide, fostering innovation and creativity while reducing overhead costs, resulting in a more agile and efficient workforce.
				</p>
				<div>
					<a href="/get-started" class="bg-blue-500 text-white text-xl font-semibold px-6 py-2 rounded border border-blue-500 mr-2">Get started</a>
					<a href="/" class=" text-xl font-semibold px-6 py-2 rounded border-2 border-black">Learn More</a>
				</div>
			</div>	
	
			<div>
				<p class="font-semibold text-2xl">Trusted by</p>
				<div class=" flex items-center">
					<div class="h-full">
						<img src={MicrosoftLogo} alt="Microsoft Logo" class="w-[150px] h-[75px] "/>
					</div>
					<div class="h-full ml-3">
						<img src={GoogleLogo} alt="Microsoft Logo" class="w-[150px] h-[75px] "/>
					</div>
					<div class="h-full">
						<img src={LacosteLogo} alt="Microsoft Logo" class="w-[150px] h-[75px] "/>
					</div>
				</div>
			</div>
		</div>

		<div class="w-1/2 relative avatars">
			<div class="h-28 w-28 rounded-full overflow-clip">
				<img src={Amy} alt="Microsoft Logo" class="w-full h-full "/>
			</div>
			<div class="h-28 w-28 rounded-full overflow-clip">
				<img src={Amir} alt="Microsoft Logo" class="w-full h-full "/>
			</div>
			<div class="h-28 w-28 rounded-full overflow-clip">
				<img src={Alex} alt="Microsoft Logo" class="w-full h-full "/>
			</div>
			<div class="h-28 w-28 rounded-full overflow-clip">
				<img src={Annie} alt="Microsoft Logo" class="w-full h-full "/>
			</div>
		</div>

	</section>
</div>

<style lang="postcss">
	.avatars img {
		aspect-ratio: 1 / 1;
	}
</style>
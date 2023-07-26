<script lang="ts">
	import { lists } from '$lib/data/kanban';
	import {  ChevronsRight, Maximize2 } from 'lucide-svelte';
	import Kanban from './Kanban.svelte';
	import {fly} from 'svelte/transition'
	let openTask = false;

	let h;
	let w: number;

</script>



<div class="overflow-hidden" >

<Kanban lists={$lists} on:taskClick={(e) => {
	const list = $lists.find(list => list.id === e.detail.listId)
	if(!list) return
	const todo = list.items.find(todo => todo.id === e.detail.todoId)
	if(!openTask) {
		w = 600;
		openTask = true;
	}
}} />
</div>
		
{#if openTask}

	<div
		transition:fly={{opacity: 1, duration: 500, x: window.innerWidth}}
			class=" fixed top-0 right-0 h-full shadow-xl border-l bg-white task"
			style="width: {w}px"
		
		>
		<div class="p-2 flex items-center gap-2">
			<button on:click={() => openTask = false}>
				<ChevronsRight size={25} class="text-gray-500"/>
			</button>
			<button on:click={() => {
				w = window.innerWidth;
				}}>
				<Maximize2 size={18} class="text-gray-500"/>
			</button>
		</div>
		
		<div class="p-8">
			<h3 class="font-bold text-3xl mb-10">Task title goes here</h3>

			<!-- Info -->
			<div class="flex flex-col gap-4">
				<div class="grid-row">
					<p>Status:</p>
					<p>In Progress</p>
				</div>
				<div class="grid-row">
					<p>Due:</p>
					<p>23 Jan, 2024</p>
				</div>
				<div class="grid-row">
					<p>Priority:</p>
					<p>High</p>
				</div>
				<div class="grid-row">
					<p>Tags:</p>
					<p>Bug</p>
				</div>
				<div class="grid-row">
					<p>Assignee:</p>
					<p>Noel Vega</p>
				</div>

				<div>
					<p>Description</p>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius earum distinctio harum eum a quis recusandae debitis autem suscipit nostrum? Officia assumenda laborum quo ipsam vel reprehenderit labore architecto qui.</p>
				</div>

				<div>
					<p>Sub tasks</p>
				</div>
			</div>

			<!-- Comments -->
			<div>

			</div>
		</div>
	</div>
{/if}


<style lang="postcss">
	.task {
		transition: all 500ms;
	}
	.grid-row {
		display: grid;
		grid-template-columns: 150px 1fr
	}

</style>
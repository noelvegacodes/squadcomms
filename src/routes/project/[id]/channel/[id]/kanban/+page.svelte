<script lang="ts">
	import { lists } from '$lib/data/kanban';
	import Kanban from './Kanban.svelte';
</script>
<Kanban lists={$lists} />


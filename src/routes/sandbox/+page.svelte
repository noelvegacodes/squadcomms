<script lang="ts">
    import {helloWorld} from '$lib/db'

    export let data;
</script>

<div>
    Hello Harry
    <p> Now {data.now}</p>
    <p> Latency: {data.latency}</p>
</div>
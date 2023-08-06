
<script lang="ts">
    export let src: string | null
</script>


<div class="h-52 bg-gray-500 rounded-xl overflow-hidden">
    {#if src}
    <img src={src} alt="user-banner" class="h-full w-full object-cover" />
    {/if}
</div>
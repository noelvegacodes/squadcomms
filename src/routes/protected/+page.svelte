<script lang="ts">
    export let data;
</script>

<p class="text-5xl text-red-500">Protected  page</p>


<div>
    <p>@{data.session.account.handle}</p>
    <p>{data.session.account.email}</p>
</div>
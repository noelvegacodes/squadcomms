<script lang="ts">
    import { faker } from '@faker-js/faker'
    import Card from "$lib/components/Card.svelte";

    faker.seed(1)
    const posts = new Array(100).fill(null).map(i => ({
        avatar: faker.internet.avatar(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        createdAt: faker.date.recent(),
        text: faker.lorem.paragraphs(2)
    }))
</script>

<h1>Noel Vega's Component-Driven Exploration</h1>
<div class="max-w-2xl w-full mx-auto flex flex-col gap-2">
    {#each posts as post}
        <Card {...post} />
    {/each}
</div>
<style>

</style>
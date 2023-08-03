<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import { user } from '$lib/stores/mock/user';
	import { faker } from '@faker-js/faker/locale/af_ZA';
	const { fname, lname, handle, avatar } = $user;

	const posts = new Array(10).fill(null).map((post) => {
		const rng = Math.floor(Math.random() * 10);
		return {
			name: `${fname} ${lname}`,
			content: faker.lorem.lines({ min: 1, max: 5 }),
			handle,
			avatar,
			date: faker.date.recent().toLocaleDateString(),
			comments: faker.number.int({ min: 0, max: 100 }),
			reposts: faker.number.int({ min: 100, max: 1000 }),
			likes: faker.number.int({ min: 1000, max: 10000 }),
			image: rng < 3 ? faker.image.urlLoremFlickr({ category: 'cats' }) : ''
		};
	});
</script>

<div class="divide-y divide-slate-700">
	{#each posts as post}
		<Post {...post} />
	{/each}
</div>

import { faker } from '@faker-js/faker/locale/af_ZA';

export const posts = new Array(10).fill(null).map((post) => {
	const fname = faker.person.firstName();
	const lname = faker.person.lastName();
	const rng = Math.floor(Math.random() * 10);

	return {
		name: `${fname} ${lname}`,
		content: faker.lorem.lines(3),
		handle: '@' + fname,
		avatar: faker.image.avatar(),
		date: faker.date.recent().toLocaleDateString(),
		comments: faker.number.int({ min: 0, max: 100 }),
		reposts: faker.number.int({ min: 100, max: 1000 }),
		likes: faker.number.int({ min: 1000, max: 10000 }),
		image: rng < 3 ? faker.image.urlLoremFlickr({ category: 'cats' }) : ''
	};
});

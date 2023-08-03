import { writable } from 'svelte/store';
import { faker } from '@faker-js/faker';

const fname = faker.person.firstName();
export const user = writable({
	fname,
	lname: faker.person.lastName(),
	handle: '@' + fname,
	avatar: faker.image.avatar(),
	banner: faker.image.city(),
	country: faker.location.country(),
	bio: faker.lorem.lines(3)
});

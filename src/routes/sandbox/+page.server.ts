import { helloWorld } from '$lib/db';

export const load = async () => {
	const result = await helloWorld();
	return result;
};

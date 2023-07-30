export const load = ({ locals }) => {
	const { session } = locals;
	console.log('layout load: ', session);

	return { session };
};

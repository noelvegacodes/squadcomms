<script lang="ts">
	import { VERCEL_URL } from '$env/static/private';
	import { Button, Heading, Hr, Html, Preview, Section, Text } from 'svelte-email';

	export let confirmationLink: string;
</script>

<Html lang="en">
	<Preview preview="Expires in 5 minutes" />
	<Section>
		<Heading>Build Story Support</Heading>
		<Text>Validate your email below</Text>
	</Section>
	<Hr />
	<Button href={confirmationLink}>Confirm email</Button>
</Html>

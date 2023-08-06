<script lang="ts">
	import { VERCEL_URL } from '$env/static/private';
	import { Button, Heading, Hr, Html, Preview, Section, Text } from 'svelte-email';

	export let passwordResetLink: string;
</script>

<Html lang="en">
	<Preview preview="Expires in 5 minutes" />
	<Section>
		<Heading>Build Story Support</Heading>
		<Text>Forgot your password?</Text>
		<Text>No worries, click the link below to begin resetting your password.</Text>
	</Section>
	<Hr />
	<Button href={passwordResetLink}>Reset Password</Button>
</Html>

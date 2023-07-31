<script lang="ts">
    import { Button, Heading, Hr, Html, Preview, Section, Text } from 'svelte-email';

    export let passwordSessionId: string;
</script>

<Html lang="en">
    <Preview preview="Expires in 5 minutes" />
    <Section>
        <Heading>Build Story Support</Heading>
        <Text>Forgot your password? No worries!</Text>
        <Text>Click the link below to begin resetting your password.</Text>
    </Section>
    <Hr />
    <Button href="http://www.localhost:5173/password-reset/{passwordSessionId}">Reset Password</Button>
</Html>
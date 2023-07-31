import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

const email = faker.internet.email();
const password = faker.string.alphanumeric({ length: { min: 6, max: 8 } });
const handle = faker.person.firstName();

test('account sign up', async ({ page }) => {
	await page.goto('http://www.localhost:5173/signup');
	const emailInput = page.getByPlaceholder('Rick.Astley@example.com');
	const handleInput = page.getByPlaceholder('NvrGonnaGiveYouUp');
	const passwordInput = page.getByPlaceholder('*********');
	const submitButton = page.getByRole('button', { name: 'Create my account' });

	await emailInput.fill(email);
	await passwordInput.fill(password);
	await handleInput.fill(handle);
	await submitButton.click();

	// const cookies = await page.context().cookies();
	// console.log(cookies);
	// page.getByText('Protected page');

	// const account = await db
	// 	.select()
	// 	.from(AccountsTable)
	// 	.where(and(eq(AccountsTable.email, email), eq(AccountsTable.handle, handle)));
	// expect(account[0].email).toBe(email);
});

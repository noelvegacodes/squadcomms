import { PRIVATE_RESEND_TOKEN } from '$env/static/private';
import { Resend } from 'resend';

export const resend = new Resend(PRIVATE_RESEND_TOKEN);

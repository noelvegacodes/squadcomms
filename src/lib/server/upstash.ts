import {
	PRIVATE_UPSTASH_REDIS_REST_TOKEN,
	PRIVATE_UPSTASH_REDIS_REST_URL,
	PRIVATE_UPSTASH_QSTASH_URL,
	PRIVATE_UPSTASH_QSTASH_TOKEN
} from '$env/static/private';
import { Redis } from '@upstash/redis';
import { Client } from '@upstash/qstash';

export const redis = new Redis({
	url: PRIVATE_UPSTASH_REDIS_REST_URL,
	token: PRIVATE_UPSTASH_REDIS_REST_TOKEN
});

export const qstash = new Client({
	token: PRIVATE_UPSTASH_QSTASH_TOKEN
});

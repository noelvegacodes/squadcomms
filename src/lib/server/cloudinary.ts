import { PRIVATE_UPLOAD_PRESET, PRIVATE_CLOUDINARY_API_KEY } from '$env/static/private';

export async function uploadImage(file: File) {
	if (!file) {
		throw new Error('Did not provide a file');
	}
	const url = 'https://api.cloudinary.com/v1_1/' + PRIVATE_UPLOAD_PRESET + '/auto/upload';
	const cloudinaryFormData = new FormData();
	cloudinaryFormData.append('file', file);
	cloudinaryFormData.append('api_key', PRIVATE_CLOUDINARY_API_KEY);
	cloudinaryFormData.append('upload_preset', PRIVATE_UPLOAD_PRESET);
	const response = await fetch(url, { method: 'POST', body: cloudinaryFormData });
	const data = await response.json();
	if (data.error) {
		return { ok: false, message: 'cloudinary error' };
	}
	return { ok: true, url: data.secure_url };
}

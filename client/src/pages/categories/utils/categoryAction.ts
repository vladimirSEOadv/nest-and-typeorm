import { instance } from '../../../api/axios.api.ts';
import axios from 'axios';

// TODO Fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const categoriesAction = async ({ request }) => {
	try {
		if (request.method === 'POST') {
			const formData = await request.formData();
			const title = {
				title: formData.get('title'),
			};
			await instance.post('/categories', title);
			return null;
		}
		if (request.method === 'PATCH') {
			const formData = await request.formData();
			const category = {
				id: formData.get('id'),
				title: formData.get('title'),
			};
			await instance.patch(`/categories/${category.id}`, category);
			return null;
		}
		if (request.method === 'DELETE') {
			const formData = await request.formData();
			const categoryId = formData.get('id');
			await instance.delete(`/categories/${categoryId}`);
			return null;
		}
	} catch (err) {
		axios.isAxiosError(err)
			? console.error(`Axios error: ${err.response?.data.message}`)
			: console.error(`Unknown error ${err}`);
	}
};

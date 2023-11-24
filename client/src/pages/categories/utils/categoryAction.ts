import { instance } from '../../../api/axios.api.ts';

// TODO Fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const categoriesAction = async ({ request }) => {
	if (request.method === 'POST') {
		const formData = await request.formData();
		const title = {
			title: formData.get('title'),
		};
		await instance.post('/categories', title);
		return null;
	} else if (request.method === 'PATCH') {
		const formData = await request.formData();
		const category = {
			id: formData.get('id'),
			title: formData.get('title'),
		};
		await instance.patch(`/categories/${category.id}`, category);
		return null;
	} else if (request.method === 'DELETE') {
		const formData = await request.formData();
		const categoryId = formData.get('id');
		await instance.delete(`/categories/${categoryId}`);
		return null;
	}
};

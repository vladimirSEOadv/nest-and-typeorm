import { instance } from '../../../api/axios.api.ts';
import { ICategory } from '../../../types/types.ts';

export const categoryLoader = async () => {
	const { data } = await instance.get<ICategory[]>('/categories');
	return data;
};

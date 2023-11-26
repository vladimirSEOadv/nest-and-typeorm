import { instance } from '../../../api/axios.api.ts';
import { ICategory } from '../../../types/types.ts';
import axios from 'axios';

export const categoryLoader = async () => {
	try {
		const { data } = await instance.get<ICategory[]>('/categories');
		return data;
	} catch (err) {
		axios.isAxiosError(err)
			? console.error(`Axios error: ${err.response?.data.message}`)
			: console.error(`Unknown error ${err}`);
	}
};

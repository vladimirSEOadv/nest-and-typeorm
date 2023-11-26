import { instance } from '../../../api/axios.api.ts';
import { toast } from 'react-toastify';
import axios from 'axios';

// TODO FIX TYPES
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const transactionsAction = async ({ request }) => {
	try {
		if (request.method === 'POST') {
			const formData = await request.formData();
			const newTransaction = {
				title: formData.get('title'),
				amount: Number(formData.get('amount')),
				category: formData.get('category'),
				type: formData.get('type'),
			};
			await instance.post('/transactions', newTransaction);
			toast.success('New transaction created');
			return null;
		}
		if (request.method === 'DELETE') {
			const formData = await request.formData();
			const id = formData.get('id');
			await instance.delete(`/transactions/${id}`);
			toast.success('Transaction deleted');
			return null;
		}
	} catch (err) {
		axios.isAxiosError(err)
			? console.error(`Axios error: ${err.response?.data.message}`)
			: console.error(`Unknown error ${err}`);
	}
};

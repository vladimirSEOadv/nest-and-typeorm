import { instance } from '../../../api/axios.api.ts';
import { ICategory, ITransaction } from '../../../types/types.ts';
import axios from 'axios';

export const transactionsLoader = async () => {
	try {
		const categories = await instance.get<ICategory[]>('/categories');
		const transactions = await instance.get<ITransaction[]>('/transactions');
		const totalIncome = await instance.get<number>('/transactions/income/find');
		const totalExpense = await instance.get<number>(
			'/transactions/expense/find',
		);
		return {
			categories: categories.data,
			transactions: transactions.data,
			totalIncome: totalIncome.data,
			totalExpense: totalExpense.data,
		};
	} catch (err) {
		axios.isAxiosError(err)
			? console.error(`Axios error: ${err.response?.data.message}`)
			: console.error(`Unknown error ${err}`);
	}
};

import { FC, useCallback, useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { formatDate } from '../../../helpers/date.helper.ts';
import { formatToUsd } from '../../../helpers/currency.helper.ts';
import { FaTrash } from 'react-icons/fa';
import {
	IResponseTransactionLoader,
	ITransaction,
} from '../../../types/types.ts';
import axios from 'axios';
import { instance } from '../../../api/axios.api.ts';
import ReactPaginate from 'react-paginate';

interface ITransactionTable {
	limit: number;
}

export const TransactionTable: FC<ITransactionTable> = ({ limit }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader;
	const [data, setData] = useState<ITransaction[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);

	const fetchTransactions = useCallback(
		async (page: number) => {
			try {
				const response = await instance.get(
					`/transactions/pagination?page=${page}&limit=${limit}`,
				);
				if (response.status === 200) {
					setData(response.data);
					setTotalPages(Math.ceil(transactions.length / limit));
				}
			} catch (err) {
				axios.isAxiosError(err)
					? console.error(`Axios error: ${err.response?.data.message}`)
					: console.error(`Unknown error ${err}`);
			}
		},
		[limit, transactions],
	);

	useEffect(() => {
		fetchTransactions(currentPage);
	}, [currentPage, transactions, fetchTransactions]);

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1);
	};

	return (
		<>
			<ReactPaginate
				pageCount={totalPages}
				onPageChange={handlePageChange}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				nextLabel="next >"
				previousLabel="< previous"
				className="mt-4 flex items-center justify-end gap-3"
				activeClassName="bg-blue-600 rounded-sm "
				pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
				previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				disabledClassName="text-white/50 cursor-not-allowed"
				disabledLinkClassName="text-slate-600 cursor-not-allowed"
				breakLabel="..."
				renderOnZeroPageCount={null}
			/>
			<div className="mt-4 rounded-md bg-slate-800 px-4 py-3">
				<table className="w-full ">
					<thead>
						<tr>
							<td className="font-bold">Title</td>
							<td className="font-bold">Amount</td>
							<td className="font-bold">Category</td>
							<td className="font-bold">Data</td>
							<td className="font-bold">id</td>
							<td className="text-right">Action</td>
						</tr>
					</thead>
					<tbody>
						{data.length
							? data.map((transaction) => {
									return (
										<tr key={transaction.id}>
											<td>{transaction.title}</td>
											<td
												className={
													transaction.type === 'income'
														? 'text-green-500'
														: 'text-red-500'
												}
											>
												<span>
													{`${
														transaction.type === 'income' ? `+` : `-`
													} ${formatToUsd.format(transaction.amount)}`}
												</span>
											</td>
											<td>{transaction.category?.title || 'Other'}</td>
											<td>{formatDate(transaction.createdAt)}</td>
											<td>{transaction.id}</td>
											<td className="text-right">
												<Form method={'delete'} action={'/transactions'}>
													<input
														name={'id'}
														defaultValue={transaction.id}
														type="text"
														hidden={true}
													/>
													<button
														type={'submit'}
														className="btn hover:btn-red ml-auto"
													>
														<FaTrash />
													</button>
												</Form>
											</td>
										</tr>
									);
							  })
							: null}
					</tbody>
				</table>
			</div>
		</>
	);
};

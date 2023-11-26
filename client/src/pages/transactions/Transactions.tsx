import { FC } from 'react';
import { TransactionForm } from './components/TransactionForm.tsx';
import { TransactionTable } from './components/TransactionTable.tsx';
import { useLoaderData } from 'react-router-dom';
import { IResponseTransactionLoader } from '../../types/types.ts';
import { formatToUsd } from '../../helpers/currency.helper.ts';
import { Chart } from '../categories/components/Chart.tsx';

export const Transactions: FC = () => {
	const { totalIncome, totalExpense } =
		useLoaderData() as IResponseTransactionLoader;
	return (
		<>
			<div className="mt-4 grid  grid-cols-3 items-start gap-4">
				<div className="col-span-2 grid ">
					<TransactionForm />
				</div>
				<div className="h-full rounded-md bg-slate-800 p-3">
					<div className="grid  grid-cols-2 gap-3">
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total income:
							</p>
							<p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
								{formatToUsd.format(totalIncome)}
							</p>
						</div>
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total Expense:
							</p>
							<p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
								{formatToUsd.format(totalExpense)}
							</p>
						</div>
					</div>
					<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
				</div>
			</div>
			<h1 className="my-5">
				<TransactionTable limit={5} />
			</h1>
		</>
	);
};

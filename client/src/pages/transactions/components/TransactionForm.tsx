import { FC, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { IResponseTransactionLoader } from '../../../types/types.ts';
import { CategoryModal } from '../../categories/components/CategoryModal.tsx';

export const TransactionForm: FC = () => {
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const { categories } = useLoaderData() as IResponseTransactionLoader;
	return (
		<div className="rounded-md bg-slate-800 p-4 ">
			<Form className="grid gap-2" method="post" action="/transactions">
				<label className="grid" htmlFor="transaction-form-title">
					<span>Title</span>
					<input
						id={'transaction-form-title'}
						// value={'Test'} // TODO REMOVE DEFAULT VALUES
						className="input border-slate-700"
						type="text"
						placeholder="Title..."
						name="title"
						required={true}
					/>
				</label>
				<label className="grid" htmlFor="transaction-form-amount">
					<span>Amount</span>
					<input
						id={'transaction-form-amount'}
						// value={123} // TODO REMOVE DEFAULT VALUES
						className="input border-slate-700"
						type="number"
						placeholder="Amount..."
						name="amount"
						required={true}
					/>
				</label>
				{/*Select*/}
				{categories.length ? (
					<label htmlFor="transaction-form-category" className="grid">
						<span>Category</span>
						<select
							id={'transaction-form-category'}
							className="input border-slate-700"
							name="category"
							required={true}
						>
							{categories.map((ctg) => {
								return (
									<option key={ctg.id} value={ctg.id}>
										{ctg.title}
									</option>
								);
							})}
						</select>
					</label>
				) : (
					<h1 className="mt-1 text-red-300">
						To continue create a category first
					</h1>
				)}
				{/*Add Category*/}
				<button
					onClick={(e) => {
						e.preventDefault();
						setVisibleModal(true);
					}}
					className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Manage Categories:</span>
				</button>
				{/*Radio buttons*/}
				<div className="flex items-center gap-4">
					<label
						htmlFor={'transaction-form-income-radio-btn'}
						className="flex cursor-pointer items-center gap-2"
					>
						<input
							id={'transaction-form-income-radio-btn'}
							type="radio"
							name="type"
							defaultValue={'income'}
							required={true}
							className="form-radio text-blue-600"
						/>
						<span>Income</span>
					</label>
					<label
						htmlFor={'transaction-form-expense-radio-btn'}
						className="flex cursor-pointer items-center gap-2"
					>
						<input
							id={'transaction-form-expense-radio-btn'}
							type="radio"
							name="type"
							defaultValue={'expense'}
							required={true}
							className="form-radio text-blue-600"
						/>
						<span>Expense</span>
					</label>
				</div>
				{/*Submit button*/}
				<button type={'submit'} className="btn btn-green mt-2 max-w-fit">
					Submit
				</button>
			</Form>
			{visibleModal && (
				<CategoryModal
					type={'post'}
					formTitle={'My text'}
					placeholderText={'My text'}
					setVisibleModal={setVisibleModal}
				/>
			)}
		</div>
	);
};

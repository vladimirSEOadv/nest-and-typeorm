import { FC, useState } from 'react';
import { Form } from 'react-router-dom';

interface ICategoryModal {
	type: 'post' | 'patch';
	id?: number;
	formTitle: string;
	placeholderText: string;
	setVisibleModal: (visible: boolean) => void;
	initText?: string;
}

export const CategoryModal: FC<ICategoryModal> = ({
	type,
	id,
	setVisibleModal,
	formTitle,
	placeholderText,
	initText = '',
}) => {
	const [inputValue, setInputValue] = useState(initText);
	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-screen items-center justify-center bg-black/50">
			<Form
				action={'/categories'}
				method={type}
				className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5"
				onSubmit={() => setVisibleModal(false)}
			>
				<label htmlFor="category-form-title">
					<small>{formTitle}</small>
					<input
						id={'category-form-title'}
						autoFocus={true}
						className="input w-full"
						type="text"
						name={'title'}
						placeholder={placeholderText}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</label>
				<label hidden htmlFor="category-form-id">
					<small>Category id</small>
					<input
						id={'category-form-id'}
						className="input w-full"
						type="text"
						name={'id'}
						defaultValue={id}
					/>
				</label>
				<div className="flex items-center gap-2">
					<button className="btn btn-green" type={'submit'}>
						{type === 'patch' ? 'Save' : 'Create'}
					</button>
					<button
						onClick={() => setVisibleModal(false)}
						className="btn btn-red"
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	);
};

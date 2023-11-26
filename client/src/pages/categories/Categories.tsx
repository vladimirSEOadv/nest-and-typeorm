import { FC, useState } from 'react';
import { CategoryList } from './components/CategoryList.tsx';
import { FaPlus } from 'react-icons/fa';
import { CategoryModal } from './components/CategoryModal.tsx';
import { useLoaderData } from 'react-router-dom';
import { ICategory } from '../../types/types.ts';

export const Categories: FC = () => {
	const categories = useLoaderData() as ICategory[];
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const [idForPatchCategory, setIdForPatchCategory] = useState<number>(0);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const currentCategory = categories.find(
		(item) => item.id === idForPatchCategory,
	);
	const modals = {
		modalForCreate: (
			<CategoryModal
				formTitle={'Enter category title'}
				placeholderText={'Title...'}
				type={'post'}
				initText={''}
				setVisibleModal={setVisibleModal}
			/>
		),

		modalForEdit: (
			<CategoryModal
				formTitle={'New category title'}
				placeholderText={'Title...'}
				type={'patch'}
				id={idForPatchCategory}
				initText={currentCategory?.title || ''}
				setVisibleModal={setVisibleModal}
			/>
		),
	};

	return (
		<>
			<div className="mt-10 rounded-md bg-slate-800 p-4">
				<CategoryList
					setIsEdit={setIsEdit}
					setIdForPatchCategory={setIdForPatchCategory}
					setVisibleModal={setVisibleModal}
					categories={categories}
				/>

				<button
					onClick={() => setVisibleModal(true)}
					className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>
			{visibleModal
				? isEdit
					? modals.modalForEdit
					: modals.modalForCreate
				: null}
		</>
	);
};

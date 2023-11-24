import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { Form } from 'react-router-dom';
import { ICategory } from '../../../types/types.ts';
import { FC } from 'react';

interface CategoryListProps {
	categories: ICategory[];
	setIsEdit: (value: boolean) => void;
	setIdForPatchCategory: (id: number) => void;
	setVisibleModal: (value: boolean) => void;
}

export const CategoryList: FC<CategoryListProps> = ({
	categories,
	setIsEdit,
	setIdForPatchCategory,
	setVisibleModal,
}) => {
	return (
		<>
			<h1>Your category list:</h1>
			<div className="mt-2 flex flex-wrap items-center gap-2">
				{categories.map((category, idx) => {
					return (
						<div
							key={category.id}
							className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2"
						>
							{category.title}
							<div className="absolute bottom-0 left-0 right-0 top-0 hidden  items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
								<button
									onClick={() => {
										setIdForPatchCategory(category.id);
										setIsEdit(true);
										setVisibleModal(true);
									}}
								>
									<AiFillEdit />
								</button>
								<Form method={'delete'} action={'/categories'} className="flex">
									<input type="hidden" name="id" value={category.id} />
									<button type={'submit'}>
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

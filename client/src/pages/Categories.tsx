import { FC, useState } from 'react';
import { CategoryList } from '../components/CategoryList.tsx';
import { FaPlus } from 'react-icons/fa';
import { instance } from '../api/axios.api.ts';
import { CategoryModal } from '../components/CategoryModal.tsx';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const categoriesAction = async ({ request }) => {
	if (request.method === 'POST') {
		const formData = await request.formData();
		const title = {
			title: formData.get('title'),
		};
		await instance.post('/categories', title);
		return null;
	} else if (request.method === 'PATCH') {
		return null;
	} else if (request.method === 'DELETE') {
		return null;
	}
};

export const Categories: FC = () => {
	const [visibleModal, setVisibleModal] = useState<boolean>(false);

	return (
		<>
			<div className="mt-10 rounded-md bg-slate-800 p-4">
				<CategoryList />

				<button
					onClick={() => setVisibleModal(true)}
					className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>
			{/*Add Category modal*/}
			{visibleModal && (
				<CategoryModal type={'post'} id={1} setVisibleModal={setVisibleModal} />
			)}
			{/*Edit Category modal*/}
		</>
	);
};

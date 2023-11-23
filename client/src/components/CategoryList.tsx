import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { Form } from 'react-router-dom';

export const CategoryList = () => {
	return (
		<>
			<h1>Your category list:</h1>
			<div className="mt-2 flex flex-wrap items-center gap-2">
				<div className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2">
					Salary
					<div className="absolute bottom-0 left-0 right-0 top-0 hidden  items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
						<button>
							<AiFillEdit />
						</button>
						<Form method={'delete'} action={'/categories'} className="flex ">
							<input type="hidden" value={'Category id'} />
							<button type={'submit'}>
								<AiFillCloseCircle />
							</button>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

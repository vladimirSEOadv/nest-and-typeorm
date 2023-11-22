import { FC } from 'react';
import img from '../assets/404-Page-Featured-Image.png';
import { Link } from 'react-router-dom';

export const ErrorPage: FC = () => {
	return (
		<div className="ga flex min-h-screen flex-col items-center justify-center bg-slate-900 font-roboto text-white">
			<img className="pb-2 " src={img} alt="" />
			<Link
				to={'/'}
				className="rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600"
			>
				Back
			</Link>
		</div>
	);
};

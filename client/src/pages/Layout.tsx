import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
	return (
		<div className="min-h-screen bg-slate-900 pb-20 font-roboto text-white">
			<div className="">HEADER</div>
			<div className="container">
				<Outlet />
			</div>
		</div>
	);
};

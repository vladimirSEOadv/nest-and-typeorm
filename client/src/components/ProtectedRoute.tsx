import { FC, JSX } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import protectedImg from '../assets/big-lock.png';

interface IProtectedRoute {
	children: JSX.Element;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
	const isAuth = useAuth();
	return (
		<>
			{isAuth ? (
				children
			) : (
				<div className="mt-20 flex flex-col items-center justify-center gap-10">
					<h1 className="text-2xl">To view this page you must be logged in.</h1>
					<img className="w-1/3" src={protectedImg} alt="protected" />
				</div>
			)}
		</>
	);
};

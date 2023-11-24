import React, { FC, useState } from 'react';
import { AuthServise } from '../services/auth.servise.ts';
import { toast } from 'react-toastify';
import { LocalStorageTokenManager } from '../helpers/localStorage.helper.ts';
import { useAppDispatch } from '../store/hooks.ts';
import { login } from '../store/user/userSlice.ts';
import { useNavigate } from 'react-router-dom';

export const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const data = await AuthServise.registration({ email, password });
			if (data) {
				toast.success('Account has been created');
				setIsLogin(false);
			}
		} catch (err: unknown) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const error = err.response?.data?.message;
			toast.error(error.toString());
		}
	};
	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const data = await AuthServise.login({ email, password });
			if (data) {
				LocalStorageTokenManager.setToken(data.token);
				dispatch(login(data));
				toast.success('Login success');
				navigate('/');
			}
		} catch (err: unknown) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const error = err.response?.data?.message;
			toast.error(error.toString());
		}
	};

	return (
		<div className="mt-40 flex-col items-center justify-center bg-slate-900 text-white">
			<h1 className="mb-10 text-center text-xl">
				{isLogin ? 'Login' : 'Registration'}
			</h1>
			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className="mx-auto flex w-1/3 flex-col gap-5"
			>
				<input
					type="text"
					className="input"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type="password"
					className="input"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<button className="btn btn-green mx-auto">
					{isLogin ? 'Login' : 'Submit'}
				</button>
			</form>
			<div className="mt-5 flex justify-center">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						You dont have an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	);
};

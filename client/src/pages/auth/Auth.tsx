import { FC } from 'react';
import { useAuth } from './hooks/useAuth.ts';
import { LoginBtn } from './components/LoginBtn.tsx';

const userMail = import.meta.env.VITE_USER_MAIL || '';
const userPassword = import.meta.env.VITE_USER_PASSWORD || '';

export const Auth: FC = () => {
	const {
		isLogin,
		setIsLogin,
		email,
		setEmail,
		password,
		setPassword,
		loginHandler,
		registrationHandler,
	} = useAuth({ userMail, userPassword });

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
					<LoginBtn
						text="You dont have an account?"
						onClickHandler={() => setIsLogin(!isLogin)}
					/>
				) : (
					<LoginBtn
						text="Already have an account?"
						onClickHandler={() => setIsLogin(!isLogin)}
					/>
				)}
			</div>
		</div>
	);
};

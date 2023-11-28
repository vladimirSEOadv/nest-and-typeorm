import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../services/authService.ts';
import { toast } from 'react-toastify';
import { LocalStorageTokenManager } from '../../../helpers/localStorage.helper.ts';
import { login } from '../../../store/user/userSlice.ts';

interface AuthHookParams {
	userMail: string;
	userPassword: string;
}

interface AuthHook {
	isLogin: boolean;
	setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	registrationHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	loginHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useAuth = ({
	userMail,
	userPassword,
}: AuthHookParams): AuthHook => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [email, setEmail] = useState(userMail);
	const [password, setPassword] = useState(userPassword);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const data = await AuthService.registration({ email, password });
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
			const data = await AuthService.login({ email, password });
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
			toast.error(error);
		}
	};
	return {
		isLogin,
		loginHandler,
		registrationHandler,
		email,
		setEmail,
		password,
		setPassword,
		setIsLogin,
	};
};

import { useAppDispatch } from '../store/hooks.ts';
import { useCallback, useEffect } from 'react';
import { LocalStorageTokenManager } from '../helpers/localStorage.helper.ts';
import { AuthServise } from '../services/auth.servise.ts';
import { login, logout } from '../store/user/userSlice.ts';

export const useCheckAuth = () => {
	const dispatch = useAppDispatch();
	const checkAuth = useCallback(async () => {
		const token = LocalStorageTokenManager.getToken();
		try {
			if (token) {
				const data = await AuthServise.getProfile();
				if (data) {
					dispatch(login(data));
				} else {
					dispatch(logout);
				}
			}
		} catch (err) {
			console.error(err);
		}
	}, [dispatch]);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);
};

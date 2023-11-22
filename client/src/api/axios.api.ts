import axios from 'axios';
import { serverUrl } from '../constants/constans.ts';
import { LocalStorageTokenManager } from '../helpers/localStorage.helper.ts';

export const instance = axios.create({
	baseURL: serverUrl,
	headers: {
		Authorization: `Bearer ${LocalStorageTokenManager.getToken()}`,
	},
});

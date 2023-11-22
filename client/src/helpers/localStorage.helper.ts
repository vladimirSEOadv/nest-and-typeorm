export class LocalStorageTokenManager {
	private static key: string = 'token';

	static setToken(token: string): void {
		localStorage.setItem(LocalStorageTokenManager.key, JSON.stringify(token));
	}

	static getToken(): string {
		const data = localStorage.getItem(LocalStorageTokenManager.key);
		return data ? JSON.parse(data) : '';
	}

	static removeToken() {
		localStorage.removeItem(LocalStorageTokenManager.key);
	}
}

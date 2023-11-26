export interface IUser {
	id: number;
	email: string;
	token: string;
}

export interface IUserData {
	email: string;
	password: string;
}

export interface IResponseUser {
	email: string;
	password: string;
	id: number;
	createdAt: string;
	updatedAt: string;
}

export interface IResponseUserData {
	user: IResponseUser;
	token: string;
}

export interface ICategory {
	id: number;
	title: string;
	createdAt: string;
	updatedAt: string;
	transactions?: [];
}

export interface ITransaction {
	id: number;
	title: string;
	type: 'income' | 'expense';
	amount: number;
	createdAt: string;
	updatedAt: string;
	category: ICategory;
}

export interface IResponseTransactionLoader {
	categories: ICategory[];
	transactions: ITransaction[];
	totalIncome: number;
	totalExpense: number;
}

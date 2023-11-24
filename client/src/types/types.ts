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
	title: string;
	id: number;
	createdAt: string;
	updatedAt: string;
	transactions: [];
}

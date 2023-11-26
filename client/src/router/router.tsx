import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../pages/Layout.tsx';
import { ErrorPage } from '../pages/ErrorPage.tsx';
import { Home } from '../pages/Home.tsx';
import { Transactions } from '../pages/transactions/Transactions.tsx';
import { Categories } from '../pages/categories/Categories.tsx';
import { Auth } from '../pages/Auth.tsx';
import { ProtectedRoute } from '../components/ProtectedRoute.tsx';
import { categoriesAction } from '../pages/categories/utils/categoryAction.ts';
import { categoryLoader } from '../pages/categories/utils/categoryLoader.ts';
import { transactionsLoader } from '../pages/transactions/utils/transactionsLoader.ts';
import { transactionsAction } from '../pages/transactions/utils/transactionsAction.ts';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'transactions',
				loader: transactionsLoader,
				action: transactionsAction,
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoryLoader,
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				),
			},
			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
]);

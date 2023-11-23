import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../pages/Layout.tsx';
import { ErrorPage } from '../pages/ErrorPage.tsx';
import { Home } from '../pages/Home.tsx';
import { Transactions } from '../pages/Transactions.tsx';
import { Categories, categoriesAction } from '../pages/Categories.tsx';
import { Auth } from '../pages/Auth.tsx';
import { ProtectedRoute } from '../components/ProtectedRoute.tsx';

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
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'categories',
				action: categoriesAction,
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

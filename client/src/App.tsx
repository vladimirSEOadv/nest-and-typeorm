import { router } from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';
import { useCheckAuth } from './hooks/useCheckAuth.ts';

function App() {
	useCheckAuth();
	return <RouterProvider router={router} />;
}

export default App;

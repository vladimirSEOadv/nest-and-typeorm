import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
		<ToastContainer position="bottom-left" autoClose={4000} />
	</React.StrictMode>,
);

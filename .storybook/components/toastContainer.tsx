/**
 * React dependencies
 */
import React from 'react';

/**
 * External dependencies
 */
import { ToastContainer as ToastifyContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContainer = () => {
	return (
		<ToastifyContainer
			position='top-center'
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			pauseOnHover
			theme='light'
		/>
	);
};

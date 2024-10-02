/**
 * React dependencies
 */
import React from 'react';

/**
 * External dependencies
 */
import { ToastContainer as ToastifyContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Internal dependencies
 */
import { DELAY_CLOSE_TOAST } from '../../constants';

export const ToastContainer = () => {
	return (
		<ToastifyContainer
			position='top-center'
			autoClose={DELAY_CLOSE_TOAST}
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

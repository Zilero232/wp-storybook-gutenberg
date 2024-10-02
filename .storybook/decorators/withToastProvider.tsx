/**
 * React dependencies
 */
import React from 'react';

/**
 * External dependencies
 */

import { ToastContainer } from '@st/src/components/toastContainer';
import { Decorator } from '@storybook/react/*';

export const withToastProvider: Decorator = (Story, context) => (
	<>
		<Story {...context} />
		<ToastContainer />
	</>
);

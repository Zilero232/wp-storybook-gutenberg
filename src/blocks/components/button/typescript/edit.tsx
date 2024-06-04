/**
 * React dependency
 */
import React, { ReactElement } from 'react';

/**
 * WordPress dependencies
 */
import { Button as GButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { ButtonProps } from './types';

/** Primary UI component */
const Button = ({ label, ...props }: ButtonProps): ReactElement => {
	return <GButton {...props}>{label ?? 'Label'}</GButton>;
};

export default Button;

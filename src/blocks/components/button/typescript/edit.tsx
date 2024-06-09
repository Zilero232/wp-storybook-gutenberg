/**
 * React dependency
 */
import React, { ReactElement } from 'react';

/**
 * WordPress dependencies
 */
import { Button as GButton } from '@wordpress/components';
import { ButtonProps } from './types';

/**
 * Internal dependencies
 */

/** Primary UI component */
const Button = ({ label, ...props }: ButtonProps): ReactElement => {
	return <GButton {...props}>{label ?? 'Label'}</GButton>;
};

export default Button;

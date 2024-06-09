/**
 * External dependencies
 */
import { create } from '@storybook/theming/create';

/**
 * Internal dependencies
 */
import logoDark from './public/images/logo_dark.svg';
import logoLight from './public/images/logo_light.svg';

const generalOptions = {
	brandUrl: 'https://rgbcode.com/',
	brandTarget: '_blank',
	brandTitle: 'rgbcode',
};

export const lightTheme = create({
	...generalOptions,
	base: 'light',
	brandImage: logoDark,

	colorPrimary: '#007ACC', // Soft Blue
	colorSecondary: '#6DBF2E', // Soft Green

	// UI
	appBg: '#F5F5F5', // Light Gray
	appContentBg: '#FFFFFF',
	appBorderColor: '#DDDDDD', // Light Gray
	appBorderRadius: 8,

	// Text colors
	textColor: '#333333',
	textInverseColor: '#FFFFFF',

	// Toolbar default and active colors
	barTextColor: '#777777',
	barSelectedColor: '#6DBF2E', // Soft Green
	barHoverColor: '#007ACC', // Soft Blue
	barBg: '#FFFFFF',

	// Form colors
	inputBg: '#FFFFFF',
	inputBorder: '#CCCCCC',
	inputTextColor: '#333333',
});

export const darkTheme = create({
	...generalOptions,
	base: 'dark',
	brandImage: logoLight,

	// UI
	appBg: '#1E1E1E', // Dark Gray
	appContentBg: '#121212',
	appBorderColor: '#007ACC', // Soft Blue
	appBorderRadius: 8,

	// Text colors
	textColor: '#FFFFFF',
	textInverseColor: '#121212',

	// Toolbar default and active colors
	barTextColor: '#AAAAAA',
	barSelectedColor: '#007ACC', // Soft Blue
	barHoverColor: '#6DBF2E', // Soft Green
	barBg: '#1E1E1E',

	// Form colors
	inputBg: 'rgb(227, 234, 242)',
	inputBorder: '#007ACC', // Soft Blue
	inputTextColor: '#333',
});

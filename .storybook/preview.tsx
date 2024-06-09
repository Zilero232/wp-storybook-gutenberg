/**
 * React dependencies
 */

/**
 * External dependencies
 */
import type { Preview } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Canvas, Controls, Description, Title } from '@storybook/blocks';
import React from 'react';
import badgesConfig from './badges';
import { withStyles } from './decorators';
import { darkTheme, lightTheme } from './themes';

interface IPreview extends Preview {
	parameters: {
		sourceLinkPrefix: string;
	};
}

// Register global decorators
export const decorators = [withStyles];

const globalTypes = {
	locale: {
		description: 'Internationalization locale',
		defaultValue: 'en',
		toolbar: {
			icon: 'globe',
			dynamicTitle: true,
			items: [
				{ value: 'en', right: '🇺🇸', title: 'English' },
				{ value: 'fr', right: '🇫🇷', title: 'Français' },
			],
		},
	},
	// theme: {
	// 	description: 'Global color scheme for components.',
	// 	defaultValue: 'light',
	// 	toolbar: {
	// 		title: 'Color Scheme',
	// 		icon: 'mirror',
	// 		items: [
	// 			{ value: 'light', title: 'Light Mode' },
	// 			{ value: 'dark', title: 'Dark Mode' },
	// 		],
	// 		dynamicTitle: true,
	// 	},
	// },
};

const parameters = {
	darkMode: {
		current: 'light',
		// Override the default dark theme
		dark: darkTheme,
		// Override the default light theme
		light: lightTheme,
	},
	options: {
		storySort: {
			order: ['Docs', ['Introduction', 'Icons'], 'Components'],
		},
	},
	docs: {
		// Flips the order of the description and the primary component story
		// so the component is always visible before the fold.
		page: () => (
			<>
				<Title />
				<Description />

				<Canvas />
				<Controls />
			</>
		),
	},
	badgesConfig,
	sourceLink: 'wp-storybook-gutenberg',
	sourceLinkPrefix: 'https://github.com/Zilero232/',
};

const preview: IPreview = {
	globalTypes,
	parameters,
	decorators,
	tags: ['autodocs'],
};

export default preview;

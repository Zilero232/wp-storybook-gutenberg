/**
 * React dependencies
 */
import React from 'react';

/**
 * External dependencies
 */
import { Controls, Description, Story, Title } from '@storybook/blocks';
import type { Preview } from '@storybook/react';

/**
 * Internal dependencies
 */
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
	controls: { expanded: true },
	docs: {
		// Flips the order of the description and the primary component story
		// so the component is always visible before the fold.
		page: () => (
			<>
				<Title />
				<Description />

				<Story />
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

/**
 * React dependencies
 */
import React from 'react';

/**
 * External dependencies
 */
import { Canvas, Controls, Description, Title } from '@storybook/blocks';
import type { Preview } from '@storybook/react';

/**
 * Internal dependencies
 */
import badgesConfig from './badges';
import { useStyles } from './decorators/useStyles';

interface IPreview extends Preview {
	parameters: {
		sourceLinkPrefix: string;
	};
}

// Register global decorators
export const decorators = [useStyles];

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
	options: {
		storySort: {
			order: ['Components'],
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
};

export default preview;

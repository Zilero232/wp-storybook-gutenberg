/**
 * External dependencies
 */
import { StorybookConfig } from '@storybook/react-webpack5';

/**
 * Internal dependencies
 */
import webpackFinal from './webpack';

const config: StorybookConfig = {
	core: {
		disableTelemetry: true,
	},
	stories: ['../src/**/**/stories/*.story.@(ts|tsx|mdx)'],
	addons: [
		{
			name: '@storybook/addon-docs',
			options: { configureJSX: true },
		},
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-viewport',
		'@storybook/addon-links',
		'@storybook/addon-controls',
		'@storybook/addon-actions',
		'@storybook/addon-toolbars',
		'@storybook/addons',
		'@geometricpanda/storybook-addon-badges',
		// 'storybook-dark-mode',
		'storybook-source-link',
		'./addons/storybook-source-code', // custom addons
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
	webpackFinal,
};

export default config;

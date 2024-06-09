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

	stories: ['./docs/*.mdx', '../src/**/**/stories/*.story.@(ts|tsx|mdx)'],

	addons: [
		{
			name: '@storybook/addon-docs',
			options: { configureJSX: true },
		},
		{
			name: 'storybook-addon-turbo-build',
			options: {
				optimizationLevel: 2,
			},
		},
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-viewport',
		'@storybook/addon-links',
		'@storybook/addon-controls',
		'@storybook/addon-actions',
		'@storybook/addon-toolbars',
		'@storybook/addons',
		'@geometricpanda/storybook-addon-badges',
		'@storybook/addon-mdx-gfm',
		'storybook-dark-mode',
		'storybook-source-link',
		'./addons/storybook-source-code', // custom addons
	],

	framework: {
		name: '@storybook/react-webpack5',
		options: {
			fastRefresh: true,
			strictMode: true,
			builder: {
				fsCache: true,
			},
		},
	},

	webpackFinal,
};

export default config;

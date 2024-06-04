/**
 * WordPress dependencies
 */
import postcssPlugins from '@wordpress/postcss-plugins-preset';

export const scssLoaders = ({ isLazy }: { isLazy: boolean }) => [
	{
		loader: 'style-loader', // Embeds styles in the DOM
		options: { injectType: isLazy ? 'lazyStyleTag' : 'styleTag' },
	},
	'css-loader', // Converts CSS to CommonJS
	{
		loader: 'postcss-loader',
		options: {
			postcssOptions: {
				ident: 'postcss',
				plugins: postcssPlugins,
			},
		},
	},
	'sass-loader', // Compiles Sass to CSS
];

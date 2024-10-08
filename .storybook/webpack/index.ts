/**
 * External dependencies
 */
import path from 'path';
import { Configuration } from 'webpack';

/**
 * Internal dependencies
 */
import generateFileExample from './lib/generateFileExample';
import { scssLoaders } from './lib/scssLoaders';

const webpackFinal = async (config: Configuration): Promise<Configuration> => {
	// Generating a JSON file with typescript/javascript code for viewing in the "Source Code" addon
	await generateFileExample();

	return {
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...config?.resolve?.alias,
				'@st': path.resolve(__dirname, '../'),
			},
		},
		module: {
			...config.module,
			rules: [
				...(config?.module?.rules ?? []),
				{
					test: /\.scss$/,
					exclude: /\.lazy\.scss$/,
					use: scssLoaders({ isLazy: false }),
					include: path.resolve(__dirname, '../public/styles'),
				},
				{
					test: /\.lazy\.scss$/,
					use: scssLoaders({ isLazy: true }),
					include: path.resolve(__dirname, '../public/styles'),
				},
			],
		},
	};
};

export default webpackFinal;

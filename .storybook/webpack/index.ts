/**
 * External dependencies
 */
import path from 'path';
import { Configuration } from 'webpack';

/**
 * Internal dependencies
 */
import { generateFileExample } from './lib/generateFileExample';
import { scssLoaders } from './lib/scssLoaders';

const webpackFinal = (config: Configuration) => {
	generateFileExample();

	return {
		...config,
		module: {
			...config.module,
			rules: [
				...(config?.module?.rules ?? []),
				{
					test: /\.scss$/,
					exclude: /\.lazy\.scss$/,
					use: scssLoaders({ isLazy: false }),
					include: path.resolve(__dirname, '../styles'),
				},
				{
					test: /\.lazy\.scss$/,
					use: scssLoaders({ isLazy: true }),
					include: path.resolve(__dirname, '../styles'),
				},
			],
		},
	};
};

export default webpackFinal;

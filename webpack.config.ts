const path = require('path');

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			'@st': path.resolve(__dirname, '.storybook'),
			'@blocks': path.resolve(__dirname, 'src/blocks'),
			'@shared': path.resolve(__dirname, 'src/shared'),
		},
	},
};

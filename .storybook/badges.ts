/**
 * Provides badge configuration options.
 *
 * To apply a badge to a story, add a badge identifier prefixed by "status-" to
 * the `tags` array in the story's metadata. For example, to apply the "private"
 * badge, add "status-private" to the `tags` array.
 *
 * @see https://github.com/geometricpanda/storybook-addon-badges
 */

/**
 * External dependencies
 */
import { BadgeConfig } from '@geometricpanda/storybook-addon-badges';

/**
 * Internal dependencies
 */
import { BADGES } from './constants';

type BadgesConfig = Partial<Record<keyof typeof BADGES, BadgeConfig>>;

const badgesConfig: BadgesConfig = {
	PRIVATE: {
		title: '🔒 Private',
		tooltip: {
			title: 'Component is locked as a private API',
			desc: 'We do not yet recommend using this outside of the Gutenberg codebase.',
			links: [
				{
					title: 'About @wordpress/private-apis',
					href: 'https://developer.wordpress.org/block-editor/reference-guides/packages/packages-private-apis/',
				},
			],
		},
	},
	WIP: {
		title: '🚧 WIP',
		styles: { backgroundColor: '#FFF0BD' },
		tooltip: {
			title: 'Component is a work in progress',
			desc: 'This component is not ready for use in production, including the Gutenberg codebase. DO NOT export outside of @wordpress/components.',
		},
	},
};

export default badgesConfig;

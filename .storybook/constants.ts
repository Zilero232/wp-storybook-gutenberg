/**
 * External dependencies
 */
import { BADGE } from '@geometricpanda/storybook-addon-badges';

// storybook-source-code
export const PARAM_KEY = 'source';
export const ADDON_ID = 'storybook/source';
export const PANEL_ID = `${ADDON_ID}/panel`;

// Manually define the extended enum
export const BADGES = {
	...BADGE,
	PRIVATE: 'private',
	WIP: 'wip',
} as const;

// File JSON which stories the examples
export const FILE_NAME_JSON = 'ExamplesGBlocks';

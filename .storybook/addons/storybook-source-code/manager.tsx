/**
 * React dependencies
 */
import React from 'react';

/**
 * External dependencies
 */
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/manager-api';

/**
 * Internal dependencies
 */
import { ADDON_ID, PANEL_ID } from '../../constants';
import { StateProvider } from './providers/stateContext';
import { CodeViewer } from './ui';

// Register custom addon
addons.register(ADDON_ID, () => {
	addons.add(PANEL_ID, {
		title: 'Source Code',
		type: types.PANEL,
		render: ({ active }) => (
			<AddonPanel active={active ?? false}>
				<StateProvider>
					<CodeViewer />
				</StateProvider>
			</AddonPanel>
		),
	});
});

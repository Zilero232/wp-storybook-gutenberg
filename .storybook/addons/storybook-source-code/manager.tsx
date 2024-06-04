/**
 * React dependencies
 */
import React from 'react';

/**
 * External dependencies
 */
import { addons, types } from '@storybook/manager-api';
import CodeViewer from './ui/codeViewer';

/**
 * Internal dependencies
 */
import { ADDON_ID, PANEL_ID, PARAM_KEY } from '../../constants';

// Регистрация аддона
addons.register(ADDON_ID, () => {
	addons.add(PANEL_ID, {
		title: 'Source Code',
		type: types.PANEL,
		render: ({ active }) => <CodeViewer active={!!active} />,
		paramKey: PARAM_KEY,
	});
});

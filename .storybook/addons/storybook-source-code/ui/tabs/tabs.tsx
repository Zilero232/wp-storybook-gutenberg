/**
 * React dependency
 */
import React, { useEffect } from 'react';

/**
 * External dependencies
 */
import { Tabs as TabsStorybook } from '@storybook/components';

/**
 * Internal dependencies
 */
import { Select } from '../';
import { useStateContext } from '../../hooks/useStateContext';
import { TABS, TabValues } from '../../types';

const tabs = [
	{
		title: 'JavaScript',
		tab: TABS.JAVASCRIPT,
	},
	{
		title: 'TypeScript',
		tab: TABS.TYPESCRIPT,
	},
];

export const Tabs = () => {
	const { setSelectedFileName, selectedTab, setSelectedTab } = useStateContext();

	// Reset selected file
	useEffect(() => {
		setSelectedFileName('');
	}, [selectedTab]);

	return (
		<TabsStorybook
			selected={selectedTab}
			backgroundColor='white'
			actions={{
				onSelect: tab => setSelectedTab(tab as TabValues),
			}}
		>
			{tabs.map(({ title, tab }) => (
				<div key={tab} id={tab} title={title}>
					<Select />
				</div>
			))}
		</TabsStorybook>
	);
};

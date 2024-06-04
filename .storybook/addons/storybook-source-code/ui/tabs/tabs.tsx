/**
 * React dependency
 */
import React from 'react';

/**
 * External dependencies
 */
import { Tabs as TableStorybook } from '@storybook/components';

/**
 * Internal dependencies
 */
import { TABS, TabValues } from '../../types';
import { Select } from '../select/Select';

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

interface Props {
	selectedTab: TabValues;
	setSelectedTab: any;
	selectedFileName: string;
	setSelectedFileName: any;
	directories: any;
}

export const Tabs = ({ selectedTab, setSelectedTab, selectedFileName, setSelectedFileName, directories }: Props) => {
	return (
		<TableStorybook
			selected={selectedTab}
			backgroundColor='white'
			actions={{
				onSelect: setSelectedTab,
			}}
		>
			{tabs.map(({ title, tab }) => (
				<div key={tab} id={tab} title={title}>
					<Select selected={selectedFileName} files={directories[tab]} handleChange={setSelectedFileName} />
				</div>
			))}
		</TableStorybook>
	);
};

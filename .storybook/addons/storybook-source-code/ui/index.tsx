/**
 * React dependency
 */
import React, { useEffect } from 'react';

/**
 * External dependencies
 */
import { useStorybookState } from '@storybook/api';

/**
 * Internal dependencies
 */
import { TabsStorybook } from './tabs/tabs';
import { SyntaxHighlighter } from './syntax-high-lighter/syntaxHighlighter';
import { useStateContext } from '../hooks/useStateContext';
import { JsonFile, TABS } from '../types';
import { extractComponentName } from '../utils/helpers';

interface Props {
	jsonFile: JsonFile;
}

export const CodeViewer = ({ jsonFile }: Props) => {
	const { setDirectories, setSelectedFileName } = useStateContext();

	const { storyId } = useStorybookState();

	// Get directories from the component
	useEffect(() => {
		if (!jsonFile || !storyId) {
			return;
		}

		const componentName = extractComponentName(storyId);

		if (!componentName) {
			return console.error('Invalid file list for component:', componentName);
		}

		const directories = jsonFile[componentName];

		if (!directories) {
			return console.error('Invalid file list for component:', componentName);
		}

		const root = directories['root'] || [];
		// Set the directories to state
		setDirectories({
			[TABS.JAVASCRIPT]: [...root, ...(directories[TABS.JAVASCRIPT] || [])],
			[TABS.TYPESCRIPT]: [...root, ...(directories[TABS.TYPESCRIPT] || [])],
		});

		setSelectedFileName(''); // Reset selected file when component changes
	}, [storyId]);

	return (
		<div style={{ padding: '5px 10px' }}>
			<TabsStorybook />

			<SyntaxHighlighter />
		</div>
	);
};

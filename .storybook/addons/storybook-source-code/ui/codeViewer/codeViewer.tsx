/**
 * React dependency
 */
import React, { useEffect, useState } from 'react';

/**
 * External dependencies
 */
import { useStorybookState } from '@storybook/api';
import { AddonPanel } from '@storybook/components';

/**
 * Internal dependencies
 */
import { SyntaxHighlighter, Tabs } from '../';
import { TABS, TabValues } from '../../types';
import { extractComponentName } from '../../utils/helpers';

interface File {
	fileName: string;
	content: string;
}

interface ComponentDirectories {
	root: File[];
	javascript: File[];
	typescript: File[];
}

const initialState = { root: [], javascript: [], typescript: [] };

export const CodeViewer = ({ active }: { active: boolean }) => {
	const state = useStorybookState();

	const [jsonFile, setFileJson] = useState<Record<string, ComponentDirectories> | null>(null);

	const [directories, setDirectories] = useState<ComponentDirectories>(initialState);
	const [selectedFileName, setSelectedFileName] = useState<string>('');

	const [selectedTab, setSelectedTab] = useState<TabValues>(TABS.JAVASCRIPT);

	// Dynamic import for the file json
	useEffect(() => {
		const loadFileJson = async () => {
			try {
				const fileList = await import('../../../../public/ExamplesGBlocks.json');

				setFileJson(fileList.default || fileList);
			} catch (error) {
				console.error('Error loading file list:', error);

				setFileJson(null);
			}
		};

		loadFileJson();
	}, []);

	// Dynamic import for the file json
	useEffect(() => {
		if (!jsonFile) {
			return;
		}

		if (state?.storyId) {
			const componentName = extractComponentName(state.storyId);

			if (componentName) {
				const directories = jsonFile[componentName];

				if (directories && typeof directories === 'object') {
					// Set the directories to state
					setDirectories({
						root: directories['root'] || [],
						javascript: directories['javascript'] || [],
						typescript: directories['typescript'] || [],
					});
				} else {
					console.error('Invalid file list for component:', componentName);

					setDirectories(initialState);
				}

				setSelectedFileName(''); // Reset selected file when component changes
			}
		}
	}, [state?.storyId, jsonFile]);

	return (
		<AddonPanel active={active}>
			{!jsonFile ? (
				<p>File list not found. Please ensure the file exists.</p>
			) : (
				<>
					<Tabs
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
						selectedFileName={selectedFileName}
						setSelectedFileName={setSelectedFileName}
						directories={directories}
					/>

					<SyntaxHighlighter selectedFileName={selectedFileName} files={directories[selectedTab]} />
				</>
			)}
		</AddonPanel>
	);
};

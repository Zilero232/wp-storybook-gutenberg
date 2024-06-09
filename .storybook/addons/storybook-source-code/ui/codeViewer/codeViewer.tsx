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
import { SyntaxHighlighter, Tabs } from '../';
import { useStateContext } from '../../hooks/useStateContext';
import { TABS } from '../../types';
import { extractComponentName } from '../../utils/helpers';

export const CodeViewer = () => {
	const { storyId } = useStorybookState();
	const { jsonFile, setJsonFile, initialDirectoriesState, setDirectories, setSelectedFileName } = useStateContext();

	// Dynamic import for the file json
	useEffect(() => {
		const loadFileJson = async () => {
			try {
				// @ts-ignore
				const fileList = await import('../../../../public/ExamplesGBlocks.json');

				setJsonFile(fileList.default || fileList);
			} catch (error) {
				console.error('Error loading file json:', error);

				setJsonFile(null);
			}
		};

		loadFileJson();
	}, []);

	// Get directories from the component
	useEffect(() => {
		if (jsonFile && storyId) {
			const componentName = extractComponentName(storyId);

			if (componentName) {
				const directories = jsonFile[componentName];

				if (directories) {
					const root = directories['root'] || [];
					// Set the directories to state
					setDirectories({
						[TABS.JAVASCRIPT]: [...root, ...(directories[TABS.JAVASCRIPT] || [])],
						[TABS.TYPESCRIPT]: [...root, ...(directories[TABS.TYPESCRIPT] || [])],
					});
				} else {
					console.error('Invalid file list for component:', componentName);

					setDirectories(initialDirectoriesState);
				}

				setSelectedFileName(''); // Reset selected file when component changes
			}
		}
	}, [jsonFile, storyId]);

	return (
		<div style={{ padding: '5px 10px' }}>
			{!jsonFile ? (
				<p>File json not found. Please ensure the file exists.</p>
			) : (
				<>
					<Tabs />

					<SyntaxHighlighter />
				</>
			)}
		</div>
	);
};

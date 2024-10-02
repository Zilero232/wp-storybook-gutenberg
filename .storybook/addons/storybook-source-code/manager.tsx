/**
 * React dependencies
 */
import React, { useEffect, useState } from 'react';

/**
 * External dependencies
 */
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/manager-api';
import { MagnifyingGlass } from 'react-loader-spinner';

/**
 * Internal dependencies
 */
import { ADDON_ID, PANEL_ID } from '../../constants';
import { StateProvider } from './providers/stateContext';
import { JsonFile } from './types';
import { CodeViewer } from './ui';

// Register custom addon
addons.register(ADDON_ID, () => {
	addons.add(PANEL_ID, {
		title: 'Source Code',
		type: types.PANEL,
		render: ({ active }) => {
			const [jsonFile, setJsonFile] = useState<JsonFile>(null);
			const [loading, setLoading] = useState<boolean>(true);

			// Dynamic import for the file json
			useEffect(() => {
				const loadFileJson = async () => {
					try {
						// @ts-ignore
						const fileList = await import('../../public/ExamplesGBlocks.json');

						setJsonFile(fileList.default || fileList);
					} catch (error) {
						console.error('Error loading file json:', error);

						setJsonFile(null);
					} finally {
						setLoading(false);
					}
				};

				loadFileJson();
			}, []);

			if (loading) {
				return (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<MagnifyingGlass
							visible={true}
							height='80'
							width='80'
							ariaLabel='magnifying-glass-loading'
							wrapperClass='magnifying-glass-wrapper'
							glassColor='#c0efff'
							color='#e15b64'
						/>
					</div>
				);
			}

			if (!jsonFile) {
				return <p>File json not found. Please ensure the file exists.</p>;
			}

			return (
				<AddonPanel active={active ?? false}>
					<StateProvider>
						<CodeViewer jsonFile={jsonFile} />
					</StateProvider>
				</AddonPanel>
			);
		},
	});
});

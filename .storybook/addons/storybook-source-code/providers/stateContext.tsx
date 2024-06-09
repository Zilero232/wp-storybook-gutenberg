/**
 * React dependency
 */
import React, { createContext, ReactNode, useState } from 'react';

/**
 * Internal dependency
 */
import { ComponentDirectories, StateContextProps, TABS, TabValues } from '../types';

const initialDirectoriesState = { root: [], javascript: [], typescript: [] };

export const StateContext = createContext<StateContextProps | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
	const [jsonFile, setJsonFile] = useState<Record<string, ComponentDirectories> | null>(null);
	const [directories, setDirectories] = useState<ComponentDirectories>(initialDirectoriesState);
	const [selectedFileName, setSelectedFileName] = useState<string>('');
	const [selectedTab, setSelectedTab] = useState<TabValues>(TABS.JAVASCRIPT);

	return (
		<StateContext.Provider
			value={{
				jsonFile,
				setJsonFile,
				initialDirectoriesState,
				directories,
				setDirectories,
				files: directories[selectedTab] ?? [],
				selectedFileName,
				setSelectedFileName,
				selectedTab,
				setSelectedTab,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

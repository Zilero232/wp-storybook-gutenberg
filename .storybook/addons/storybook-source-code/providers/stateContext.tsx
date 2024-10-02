/**
 * React dependency
 */
import React, { createContext, ReactNode, useState } from 'react';

/**
 * Internal dependency
 */
import {
	ComponentDirectories,
	StateContextProps,
	TABS,
	TabValues,
} from '../types';

const initialDirectoriesState = { root: [], javascript: [], typescript: [] };

export const StateContext = createContext<StateContextProps | undefined>(
	undefined,
);

export const StateProvider = ({ children }: { children: ReactNode }) => {
	const [directories, setDirectories] = useState<ComponentDirectories>(
		initialDirectoriesState,
	);
	const [selectedFileName, setSelectedFileName] = useState<string>('');
	const [selectedTab, setSelectedTab] = useState<TabValues>(TABS.JAVASCRIPT);

	return (
		<StateContext.Provider
			value={{
				selectedTab,
				setSelectedTab,
				directories,
				setDirectories,
				files: directories[selectedTab] ?? [],
				selectedFileName,
				setSelectedFileName,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

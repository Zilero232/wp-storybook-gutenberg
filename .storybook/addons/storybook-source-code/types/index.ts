import { Dispatch, SetStateAction } from 'react';

interface State {
	jsonFile: Record<string, ComponentDirectories> | null;
	initialDirectoriesState: ComponentDirectories;
	directories: ComponentDirectories;
	selectedFileName: string;
	selectedTab: TabValues;
	files: File[];
}

export interface StateContextProps extends State {
	setJsonFile: Dispatch<SetStateAction<Record<string, ComponentDirectories> | null>>;
	setDirectories: Dispatch<SetStateAction<ComponentDirectories>>;
	setSelectedFileName: Dispatch<SetStateAction<string>>;
	setSelectedTab: Dispatch<SetStateAction<TabValues>>;
}

// Enum for representing tab types: JavaScript and TypeScript
export enum TABS {
	JAVASCRIPT = 'javascript',
	TYPESCRIPT = 'typescript',
}

// Type alias for possible values of TABS enum
export type TabValues = (typeof TABS)[keyof typeof TABS];

// Interface representing a File object
export interface ComponentDirectories {
	root?: File[];
	[TABS.JAVASCRIPT]: File[];
	[TABS.TYPESCRIPT]: File[];
}

// Interface for directories containing files, categorized by tab type
export interface File {
	fileName: string;
	content: string;
}

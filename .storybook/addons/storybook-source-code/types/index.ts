import { Dispatch, SetStateAction } from 'react';

export interface StateContextProps {
	directories: ComponentDirectories;
	setDirectories: Dispatch<SetStateAction<ComponentDirectories>>;
	selectedFileName: string;
	setSelectedFileName: Dispatch<SetStateAction<string>>;
	selectedTab: TabValues;
	setSelectedTab: Dispatch<SetStateAction<TabValues>>;
	files: File[];
}

export type JsonFile = Record<string, ComponentDirectories> | null;

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

import { TABS } from '@st/addons/storybook-source-code/types';

export interface BlockJSON {
	root?: FileJSON[];
	[TABS.JAVASCRIPT]?: FileJSON[];
	[TABS.TYPESCRIPT]?: FileJSON[];
}

export interface FileJSON {
	fileName: string;
	content: string;
}

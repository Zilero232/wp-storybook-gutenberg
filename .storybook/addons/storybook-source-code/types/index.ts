export enum TABS {
	JAVASCRIPT = 'javascript',
	TYPESCRIPT = 'typescript',
}

export type TabValues = (typeof TABS)[keyof typeof TABS];

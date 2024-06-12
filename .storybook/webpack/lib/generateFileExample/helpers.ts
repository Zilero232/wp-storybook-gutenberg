/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import { TABS } from '@st/addons/storybook-source-code/types';
import { BlockJSON, FileJSON } from './types';

// Helper function to read the content of a file if it exists and is a file
export const readFileContent = async (filePath: string): Promise<string | null> => {
	try {
		const stat = await fs.statSync(filePath);

		if (stat.isFile()) {
			return await fs.readFileSync(filePath, 'utf8');
		}
	} catch (error) {
		console.error(`Error reading file ${filePath}:`, error);
		return null;
	}

	return null;
};

// Helper function to get directories from a given path
export const getDirectories = async (source: string): Promise<string[]> => {
	try {
		const entries = await fs.readdirSync(source, { withFileTypes: true });

		return entries.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
	} catch (error) {
		console.error(`Error reading directories from ${source}:`, error);
		return [];
	}
};

// Helper function to collect files of specific types from a directory and add to JSON object
export const collectFiles = async (blockPath: string): Promise<BlockJSON> => {
	const fileTypes: { [key: string]: string[] } = {
		root: ['.json', '.php'],
		[TABS.JAVASCRIPT]: ['.js'],
		[TABS.TYPESCRIPT]: ['.ts', '.tsx'],
	};

	const blockJson: BlockJSON = {};

	for (const [type, extensions] of Object.entries(fileTypes)) {
		const dirPath = type === TABS.JAVASCRIPT ? path.join(blockPath, type) : blockPath;
		const fileContents: FileJSON[] = [];

		try {
			const files = await fs.readdirSync(dirPath);

			for (const file of files) {
				const ext = path.extname(file);

				if (extensions.includes(ext)) {
					const filePath = path.join(dirPath, file);
					const content = await readFileContent(filePath);

					if (content) {
						fileContents.push({ fileName: file, content });
					}
				}
			}

			if (fileContents.length > 0) {
				blockJson[type as keyof BlockJSON] = fileContents;
			}
		} catch (error) {
			console.error(`Error processing directory ${dirPath}:`, error);
		}
	}

	return blockJson;
};

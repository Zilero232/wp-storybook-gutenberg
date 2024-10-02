/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

/**
 * Internal dependencies
 */
import { TABS } from '@st/addons/storybook-source-code/types';
import { BlockJSON, FileJSON } from './types';

// Helper function to read the content of a file if it exists and is a file
export const readFileContent = async (
	filePath: string,
): Promise<string | null> => {
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

		return entries
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name);
	} catch (error) {
		console.error(`Error reading directories from ${source}:`, error);
		return [];
	}
};

// Helper function to collect files of specific types from a directory and add to JSON object
export const collectFiles = async (blockPath: string): Promise<BlockJSON> => {
	// Array of excluded files
	const excludedFiles = ['types.ts'];

	const fileTypes: { [key: string]: string[] } = {
		root: ['.json', '.php'],
		[TABS.TYPESCRIPT]: ['.ts', '.tsx'],
	};

	const blockJson: BlockJSON = {};

	for (const [type, extensions] of Object.entries(fileTypes)) {
		const tsFileContents: FileJSON[] = [];
		const jsFileContents: FileJSON[] = [];

		try {
			const files = await fs.readdirSync(blockPath);

			for (const file of files) {
				// Checking for an exception
				if (excludedFiles.includes(file)) {
					continue;
				}

				const ext = path.extname(file);

				if (!extensions.includes(ext)) {
					continue;
				}

				const filePath = path.join(blockPath, file);
				const content = await readFileContent(filePath);

				if (!content) {
					continue;
				}

				tsFileContents.push({ fileName: file, content });
				// Converting content to simple JS and adding to js File Contents
				jsFileContents.push({
					fileName: file.replace(ext, '.js'),
					content: stripTypes(content),
				});
			}

			if (tsFileContents.length > 0) {
				blockJson[type as keyof BlockJSON] = tsFileContents;
			}

			if (jsFileContents.length > 0) {
				blockJson[TABS.JAVASCRIPT] = jsFileContents;
			}
		} catch (error) {
			console.error(`Error processing directory ${blockPath}:`, error);
		}
	}

	return blockJson;
};

// Function for translating TypeScript to JavaScript
const stripTypes = (source: string): string => {
	const result = ts.transpileModule(source, {
		compilerOptions: {
			target: ts.ScriptTarget.ESNext,
			module: ts.ModuleKind.ESNext,
			jsx: ts.JsxEmit.Preserve,
		},
	});

	return result.outputText;
};

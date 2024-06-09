/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import { TABS } from '@st/addons/storybook-source-code/types';
import { FILE_NAME_JSON } from '@st/constants';

interface FileJSON {
	fileName: string;
	content: string;
}

interface DirectoryJSON {
	[key: string]: { [key: string]: FileJSON[] };
}

// Helper function to read the content of a file if it exists and is a file
const readFileContent = (filePath: string): string | null => {
	return fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? fs.readFileSync(filePath, 'utf8') : null;
};

// Helper function to get directories from a given path
const getDirectories = (source: string): fs.Dirent[] => {
	return fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
};

// Helper function to add files to the JSON object for a specific type (e.g., 'javascript' or 'typescript')
const addFilesToJson = (json: DirectoryJSON, directoryName: string, type: string, dirPath: string) => {
	if (fs.existsSync(dirPath)) {
		const fileContents: FileJSON[] = [];
		const files = fs.readdirSync(dirPath);

		files.forEach(file => {
			const filePath = path.join(dirPath, file);
			const content = readFileContent(filePath);

			if (content) {
				fileContents.push({ fileName: file, content });
			}
		});

		if (fileContents.length > 0) {
			if (!json[directoryName]) {
				json[directoryName] = {};
			}

			json[directoryName][type] = fileContents;
		}
	}
};

// Function to generate file.json with examples Gutenberg block
export const generateFileExample = () => {
	const blocksDirectory = path.join(__dirname, '../lib/../../../src/blocks/components');
	const directories = getDirectories(blocksDirectory);

	if (!directories) {
		return;
	}

	const json: DirectoryJSON = {};

	directories.forEach(directory => {
		const directoryPath = path.join(blocksDirectory, directory.name);

		const rootFiles = ['block.json', 'index.php'];

		// Collect root file contents
		const rootFileContents: FileJSON[] = rootFiles
			.map(file => {
				const filePath = path.join(directoryPath, file);
				const content = readFileContent(filePath);
				return content ? { fileName: file, content } : null;
			})
			.filter((file): file is FileJSON => file !== null);

		if (rootFileContents.length > 0) {
			if (!json[directory.name]) {
				json[directory.name] = {};
			}

			json[directory.name]['root'] = rootFileContents;
		}

		// Define directories to be added to JSON
		const directoriesToAdd = [TABS.JAVASCRIPT, TABS.TYPESCRIPT];

		// Add directories to JSON
		directoriesToAdd.forEach(type => {
			const dirPath = path.join(directoryPath, type);

			addFilesToJson(json, directory.name, type, dirPath);
		});
	});

	// Write the JSON object to a file
	fs.writeFileSync(path.join(__dirname, `../../public/${FILE_NAME_JSON}.json`), JSON.stringify(json, null, 2));
};

/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import { BLOCKS_DIRECTORY, PUBLIC_JSON_FILE_DIRECTORY } from '../../constants';
import { collectFiles, getDirectories } from './helpers';
import { BlockJSON } from './types';

// Function to generate ExamplesGBlocks.json with examples Gutenberg block
const generateFileExample = async () => {
	const blocksDirectory = BLOCKS_DIRECTORY;
	const directories = await getDirectories(blocksDirectory);

	if (!directories) {
		return;
	}

	const json: {
		[key: string]: BlockJSON;
	} = {};

	for (const directory of directories) {
		const directoryPath = path.join(blocksDirectory, directory);
		const blocks = await getDirectories(directoryPath);

		if (!blocks) {
			continue;
		}

		for (const block of blocks) {
			const blockPath = path.join(directoryPath, block);

			json[block.toLowerCase()] = await collectFiles(blockPath);
		}
	}

	// Write the JSON object to a file
	await fs.writeFileSync(
		PUBLIC_JSON_FILE_DIRECTORY,
		JSON.stringify(json, null, 2),
	);
};

export default generateFileExample;

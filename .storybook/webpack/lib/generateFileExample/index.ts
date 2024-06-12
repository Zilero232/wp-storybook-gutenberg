/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';

/**
 * Internal dependencies
 */
import { FILE_NAME_JSON } from '@st/constants';
import { collectFiles, getDirectories } from './helpers';
import { BlocksJSON } from './types';

// Function to generate ExamplesGBlocks.json with examples Gutenberg block
const generateFileExample = async () => {
	const blocksDirectory = path.join(__dirname, '../../../../src/blocks/');
	const directories = await getDirectories(blocksDirectory);

	if (!directories) {
		return;
	}

	const json: BlocksJSON = {};

	for (const directory of directories) {
		const directoryPath = path.join(blocksDirectory, directory);
		const blocks = await getDirectories(directoryPath);

		if (!blocks) {
			continue;
		}

		for (const block of blocks) {
			const blockPath = path.join(directoryPath, block);

			json[block] = await collectFiles(blockPath);
		}
	}

	// Write the JSON object to a file
	await fs.writeFileSync(path.join(__dirname, `../../../public/${FILE_NAME_JSON}.json`), JSON.stringify(json, null, 2));
};

export default generateFileExample;

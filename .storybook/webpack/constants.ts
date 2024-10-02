/**
 * External dependencies
 */
import path from 'path';

/**
 * Internal dependencies
 */
import { FILE_NAME_JSON } from '@st/constants';

export const PUBLIC_JSON_FILE_DIRECTORY = path.join(
	__dirname,
	`../public/${FILE_NAME_JSON}.json`,
);
export const BLOCKS_DIRECTORY = path.join(__dirname, '../../src/blocks/');

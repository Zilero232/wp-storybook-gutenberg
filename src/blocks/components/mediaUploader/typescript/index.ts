/**
 * WordPress dependencies
 */
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import json from '../block.json';
import edit from './edit';
import save from './save';

// If you want use styles, it add them to the current directory
// import './editor.scss';
// import './style.scss';

// Destructure the json file to get the name and settings for the block
const blockConfig = json as BlockConfiguration;

// Ensure name is a string before calling registerBlockType
if (typeof blockConfig.name === 'string') {
	// Register the block with proper typing for block configuration
	registerBlockType(blockConfig.name, {
		...blockConfig,
		edit, // Object shorthand property - same as writing: edit: edit,
		save, // Object shorthand property - same as writing: save: save,
	});
} else {
	console.error('Block name is undefined or not a string');
}

/**
 * A function to extract the component name from the history identifier (storyId).
 * The history identifier can have a format with or without hyphens. This function
 * is designed to handle both cases.
 *
 * @param {string} storyId - The history identifier of the story.
 *
 * @returns {string} - The extracted component name or an empty string if invalid input.
 */
export const extractComponentName = (storyId: string): string => {
	if (typeof storyId !== 'string' || storyId.trim() === '') {
		console.error('Invalid storyId provided:', storyId);
		return '';
	}

	const match = storyId.match(/(?:^[^-]*-)?([^--]+)(?:--.*)?$/);

	return match ? match[1] : storyId;
};

/**
 * Extracts the file type from the file name
 *
 * @param {string} fileName - The name of the file.
 *
 * @returns {string} - The file extension or an empty string if none found.
 */
export const getFileExtension = (fileName: string): string => {
	if (typeof fileName !== 'string' || fileName.trim() === '') {
		console.error('Invalid fileName provided:', fileName);
		return 'tsx';
	}

	const parts = fileName.split('.');
	return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
};

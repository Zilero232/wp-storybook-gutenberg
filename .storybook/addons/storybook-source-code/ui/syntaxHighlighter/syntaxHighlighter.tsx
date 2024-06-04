/**
 * React dependency
 */
import React, { Suspense, useEffect, useState } from 'react';

/**
 * External dependencies
 */
import { Loader } from '@storybook/components';
import SyntaxLighter from 'react-syntax-highlighter/dist/esm/prism';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getFileExtension } from '../../utils/helpers';

interface Props {
	selectedFileName: string;
	files: any;
}

const getExtension = (selectedFileName: string): string => {
	if (!selectedFileName) {
		return 'tsx';
	}

	return getFileExtension(selectedFileName);
};

export const SyntaxHighlighter = ({ selectedFileName, files }: Props) => {
	const [codeContent, setCodeContent] = useState<string>('');

	// Dynamic import for the file json
	useEffect(() => {
		if (!selectedFileName) {
			return;
		}

		const selectedFile = files.find(({ fileName }) => fileName === selectedFileName);

		if (selectedFile) {
			setCodeContent(selectedFile.content);
		} else {
			setCodeContent('File not found.');
		}
	}, [selectedFileName]);

	return (
		<Suspense fallback={<Loader />}>
			<SyntaxLighter language={getExtension(selectedFileName)} style={coldarkCold}>
				{codeContent || 'No code to display.'}
			</SyntaxLighter>
		</Suspense>
	);
};

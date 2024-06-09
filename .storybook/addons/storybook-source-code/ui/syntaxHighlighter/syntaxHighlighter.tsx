/**
 * React dependency
 */
import React, { useEffect, useState } from 'react';

/**
 * External dependencies
 */
import { Button } from '@storybook/components';
import SyntaxLighter from 'react-syntax-highlighter/dist/esm/prism';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Internal dependencies
 */
import { InlineIcon } from '../../../../components/inlineIcon';
import { ToastContainer } from '../../../../components/toastContainer';
import { useCopyToClipboard } from '../../../../hooks/useCopyToClipboard';
import { useStateContext } from '../../hooks/useStateContext';
import { getFileExtension } from '../../utils/helpers';

export const SyntaxHighlighter = () => {
	const { files, selectedFileName } = useStateContext();

	const [codeContent, setCodeContent] = useState<string>('');
	const [isCopied, copyToClipboard] = useCopyToClipboard();

	// Change code content
	useEffect(() => {
		const selectedFile = files.find(({ fileName }) => fileName === selectedFileName);

		setCodeContent(selectedFile?.content ?? '');
	}, [selectedFileName, files]);

	return (
		<>
			<ToastContainer />

			<div style={{ position: 'relative' }}>
				{codeContent && (
					<Button
						variant='solid'
						style={{ position: 'absolute', top: 2, right: 2 }}
						onClick={() => copyToClipboard({ text: codeContent, message: 'The code has been copied to the buffer!' })}
					>
						<InlineIcon icon='copy' /> Copy
					</Button>
				)}
				<SyntaxLighter
					language={selectedFileName ? getFileExtension(selectedFileName) : 'tsx'}
					style={coldarkCold}
					lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
					wrapLines={true}
				>
					{codeContent || 'No code to display.'}
				</SyntaxLighter>
			</div>
		</>
	);
};

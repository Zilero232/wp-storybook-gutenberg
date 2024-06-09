/**
 * React dependencies
 */
import { useState } from 'react';

/**
 * External dependencies
 */
import { toast, TypeOptions } from 'react-toastify';

interface Props {
	text: string;
	message: string;
	type?: TypeOptions;
}

export const useCopyToClipboard = (): [boolean, ({ text, message, type }: Props) => void] => {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const copyToClipboard = ({ text, message, type = 'success' }: Props) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setIsCopied(true);
				toast(message, { type });
				setTimeout(() => setIsCopied(false), 2000); // Reset the isCopied state after 2 seconds
			})
			.catch(() => setIsCopied(false));
	};

	return [isCopied, copyToClipboard];
};

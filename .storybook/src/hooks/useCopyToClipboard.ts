/**
 * React dependencies
 */
import { useState } from 'react';

/**
 * External dependencies
 */
import { toast, TypeOptions } from 'react-toastify';

/**
 * Internal dependencies
 */
import { DELAY_CLOSE_TOAST } from '../../constants';

interface Props {
	text: string;
	message: string;
	type?: TypeOptions;
}

export const useCopyToClipboard = (): [
	boolean,
	({ text, message, type }: Props) => void,
] => {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const copyToClipboard = ({ text, message, type = 'success' }: Props) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setIsCopied(true);
				toast(message, { type });
				setTimeout(() => setIsCopied(false), DELAY_CLOSE_TOAST); // Reset the isCopied state after 2 seconds.
			})
			.catch(() => setIsCopied(false));
	};

	return [isCopied, copyToClipboard];
};

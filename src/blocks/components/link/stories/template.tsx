/**
 * React dependency
 */
import React, { useState } from 'react';

/**
 * WordPress dependencies
 */
import {
	__experimentalLinkControl as LinkControl,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { Popover, ToolbarButton } from '@wordpress/components';
import { BlockControls } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { customLink } from '@wordpress/icons';

interface CustomLinkProps {
	attributes: {
		link: string;
		text: string;
	};
	setAttributes: any;
}

const CustomLink = (props: CustomLinkProps) => {
	const {
		attributes: { link, text },
		setAttributes,
	} = props;

	const [isVisible, setIsVisible] = useState(false);

	const toggleVisible = () => {
		setIsVisible(state => !state);
	};

	return (
		<div {...useBlockProps()}>
			<BlockControls>
				<ToolbarButton
					className={'components-button-link'}
					label={__('Add link', 'rscm')}
					icon={customLink}
					onClick={toggleVisible}
				/>
			</BlockControls>
			<p className={'rscm-custom-link'}>
				<RichText
					placeholder={__('Add text...', 'rscm')}
					allowedFormats={['core/bold', 'core/italic']}
					onChange={text => setAttributes({ text })}
					value={text}
				/>
			</p>

			{isVisible && (
				<Popover onFocusOutside={toggleVisible}>
					<LinkControl
						value={link}
						onChange={link => {
							setAttributes({ link });
						}}
					/>
				</Popover>
			)}
		</div>
	);
};

export default CustomLink;

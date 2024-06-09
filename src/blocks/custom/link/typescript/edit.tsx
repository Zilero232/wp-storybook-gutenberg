import { __experimentalLinkControl as LinkControl, RichText, useBlockProps } from '@wordpress/block-editor';
import { Popover, ToolbarButton } from '@wordpress/components';
import { BlockControls } from '@wordpress/editor';
import { customLink } from '@wordpress/icons';
import { useState } from 'react';
const { __ } = wp.i18n;

const Edit = props => {
	const [isVisible, setIsVisible] = useState(false),
		{
			attributes: { link, text },
			setAttributes,
		} = props;

	const toggleVisible = () => {
		setIsVisible(state => !state);
	};

	return (
		<div {...useBlockProps()}>
			<BlockControls>
				<ToolbarButton className={'components-button-link'} label={__('Add link', 'rscm')} icon={customLink} onClick={toggleVisible} />
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
				<Popover onFocusOutside={() => toggleVisible(false)}>
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

export default Edit;

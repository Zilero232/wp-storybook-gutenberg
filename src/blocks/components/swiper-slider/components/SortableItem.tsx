/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { PanelBody, PanelRow, Flex, Button, Dashicon, TextControl } from '@wordpress/components';

/**
 * External dependencies.
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * Internal dependencies.
 */
import LinkControlComponent from '../../_components/link-control-component';
import MediaUploadComponent from '../../_components/media-upload-component';

function SortableItem({ id, idx, linkData = {}, cardImage, cardImageURL, cardTitle, cardBtnText, handleChangeCardField, handleRemoveCard }) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const [linkControlData, setLinkControlData] = useState({});

	const style = {
		display: 'flex',
		alignItems: 'center',
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div className='sortable-item cards-block__sortable-item' ref={setNodeRef} style={style}>
			<PanelBody
				initialOpen={true}
				className='cards-block__panel-body'
				title={
					// Wrap the title in a div to apply drag listeners.
					<Flex {...attributes} {...listeners} justify='flex-start' style={{ cursor: 'grab' }}>
						<Dashicon icon='menu' />

						<span style={{ marginLeft: '8px' }}>{cardTitle || linkControlData?.post_title || __(`Card #`, 'rgbc') + (idx + 1)}</span>
					</Flex>
				}
			>
				<LinkControlComponent
					linkData={linkData}
					searchParams={{
						type: 'post',
					}}
					typeOrder={['brand', 'promotion', 'page', 'news', 'tip']}
					setLinkControlData={setLinkControlData}
					onChange={data => handleChangeCardField('linkData', data)}
				/>

				{(linkData?.id || linkData?.url?.length > 0) && (
					<>
						<MediaUploadComponent
							label={__('Image Preview', 'rgbc')}
							media={{
								id: cardImage,
								source_url: cardImageURL,
							}}
							onChange={({ id: mediaID = 0, source_url: mediaSourceURL = '' }) => {
								// Update cardImage AND cardImageURL.
								handleChangeCardField({
									cardImage: mediaID,
									cardImageURL: mediaSourceURL,
								});
							}}
						/>

						<TextControl
							label={__('Title', 'rgbc')}
							placeholder={linkControlData?.post_title || ''}
							value={cardTitle}
							onChange={value => handleChangeCardField('cardTitle', value)}
						/>

						<TextControl
							label={__('Button Label', 'rgbc')}
							placeholder={__('Read Review', 'rgbc')}
							value={cardBtnText}
							onChange={value => handleChangeCardField('cardBtnText', value.slice(0, 20))}
						/>
					</>
				)}

				<PanelRow>
					<Button isPrimary isDestructive onClick={() => handleRemoveCard(id)}>
						{__('Remove Card', 'rgbc')}
					</Button>
				</PanelRow>
			</PanelBody>
		</div>
	);
}

export default SortableItem;

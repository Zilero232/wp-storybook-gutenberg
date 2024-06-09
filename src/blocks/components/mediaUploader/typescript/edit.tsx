import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, ResponsiveWrapper, Spinner } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import ButtonWithConfirm from '../button-with-confirm';

const MediaUploader = ({
	id,
	media,
	onSelect,
	onRemove,
	allowedMediaTypes = ['image'],
	instructions = __('To edit the image, you need permission to upload media.', 'rscm'),
	titleText = __('Background Image', 'rscm'),
	labelText = __('Background Image', 'rscm'),
	btnText = __('Set Image', 'rscm'),
}) => {
	return (
		<div className='rscm-components-base-control' style={{ marginBottom: '20px' }}>
			<MediaUploadCheck fallback={instructions}>
				<MediaUpload
					title={titleText}
					onSelect={onSelect}
					allowedTypes={allowedMediaTypes}
					value={id}
					render={({ open }) => (
						<>
							<p className='components-field-label'>{labelText}</p>
							<div className='confirm-container'>
								<Button className={`${!media?.id ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}`} onClick={open}>
									{!id && btnText}
									{!!id && !media && <Spinner />}
									{!!id && media && (
										<ResponsiveWrapper naturalWidth={media.width} naturalHeight={media.height}>
											<img src={media.source_url} alt={media.alt} />
										</ResponsiveWrapper>
									)}
								</Button>

								{!!media?.id && (
									<ButtonWithConfirm
										confirmCallback={onRemove}
										isLink
										isDestructive
										className='btn-image-remove'
										icon='trash'
										label={__('Remove image', 'rscm')}
									/>
								)}
							</div>
						</>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
};

export default compose(
	withSelect((select, { id }) => {
		const { getMedia } = select('core');
		const media = getMedia(id) || null;

		return {
			media,
		};
	}),
)(MediaUploader);

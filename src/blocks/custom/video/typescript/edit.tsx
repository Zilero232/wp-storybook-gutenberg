/**
 * React dependencies
 */
import React, { useMemo } from 'react';

/**
 * WordPress dependencies
 */
import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow, ResponsiveWrapper, Spinner, TextControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { isURL } from '@wordpress/url';
import { Props } from './types';

/**
 * Inline dependencies
 */
// import ButtonWithConfirm from '../_components/button-with-confirm';

const allowedMediaTypes = ['image'];
const instructions = <p>{__('To edit the image, you need permission to upload media.', 'rgbcode')}</p>;

export const Edit = (props: Props) => {
	const {
		attributes: { bgImageDesktop, bgImageMobile, src, text },
		setAttributes,
		bgImageDesktopMedia,
		bgImageMobileMedia,
	} = props;

	const isSrcValid = useMemo(() => {
		return '' === src || isURL(src);
	}, [src]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')} initialOpen={true}>
					<PanelRow>
						<TextControl label={__('iFrame source URL', 'rgbcode')} type='url' value={src} onChange={value => setAttributes({ src: value })} />
					</PanelRow>

					{!isSrcValid && (
						<small
							className='components-notice is-error'
							style={{
								fontSize: '12px',
								margin: '0',
								padding: '2px 8px',
							}}
						>
							{__('Not valid URL.', 'rgbcode')}
						</small>
					)}

					<div className='components-base-control'>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__('Background Image (Desktop)', 'rgbcode')}
								onSelect={image => setAttributes({ bgImageDesktop: image.id })}
								allowedTypes={allowedMediaTypes}
								value={bgImageDesktop ?? ''}
								render={({ open }) => (
									<div>
										<div className='components-custom-label'>{__('Background Image (Desktop)', 'rgbcode')}</div>
										<div className='confirm-container'>
											<Button
												className={`${!bgImageDesktop ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}`}
												onClick={open}
											>
												{!bgImageDesktop && __('Set Desktop Image', 'rgbcode')}
												{!!bgImageDesktop && !bgImageDesktopMedia && <Spinner />}
												{!!bgImageDesktop && bgImageDesktopMedia && (
													<ResponsiveWrapper
														naturalWidth={bgImageDesktopMedia?.media_details?.width}
														naturalHeight={bgImageDesktopMedia?.media_details?.height}
													>
														<img src={bgImageDesktopMedia.source_url} alt={__('Background Image (Desktop)', 'rgbcode')} />
													</ResponsiveWrapper>
												)}
											</Button>
										</div>
									</div>
								)}
							/>
						</MediaUploadCheck>
					</div>

					<div className='components-base-control'>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__('Background Image (Mobile)', 'rgbcode')}
								onSelect={image => setAttributes({ bgImageMobile: image.id })}
								allowedTypes={allowedMediaTypes}
								value={bgImageMobile}
								render={({ open }) => (
									<div>
										<div className='components-custom-label'>{__('Background Image (Mobile)', 'rgbcode')}</div>
										<div className='confirm-container'>
											<Button
												className={`${!bgImageMobile ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}`}
												onClick={open}
											>
												{!bgImageMobile && __('Set Mobile Image', 'rgbcode')}
												{!!bgImageMobile && !bgImageMobileMedia && <Spinner />}
												{!!bgImageMobile && bgImageMobileMedia && (
													<ResponsiveWrapper
														naturalWidth={bgImageMobileMedia.media_details.width}
														naturalHeight={bgImageMobileMedia.media_details.height}
													>
														<img src={bgImageMobileMedia.source_url} alt={__('Background Image (Mobile)', 'rgbcode')} />
													</ResponsiveWrapper>
												)}
											</Button>
										</div>
									</div>
								)}
							/>
						</MediaUploadCheck>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div className='iframe-play relative'>
					<picture className='iframe-play__bg flex absolute'>
						{!!bgImageDesktop && bgImageDesktopMedia ? (
							<img src={bgImageDesktopMedia.source_url} alt={__('Background Image (Desktop)', 'rgbcode')} />
						) : (
							!!bgImageMobile && bgImageMobileMedia && <img src={bgImageMobileMedia.source_url} alt={__('Background Image (Mobile)', 'rgbcode')} />
						)}
					</picture>
					<div className='iframe-play__inner absolute'>
						<button className='iframe-play__button flex fdc jcc aic text-center absolute'>
							<div className='iframe-play__icon relative transition'>
								<img src='/wp-content/themes/nettikasinot/icons/icon-iframe-play.svg' alt={__('Play', 'rgbcode')} />
							</div>
							<RichText
								className='iframe-play__text'
								tagName='div'
								value={text}
								onChange={content => setAttributes({ text: content })}
								placeholder={__('Play text...', 'rgbcode')}
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core');

		const { bgImageDesktop, bgImageMobile } = props.attributes;

		const bgImageDesktopMedia = getMedia(bgImageDesktop) || null;
		const bgImageMobileMedia = getMedia(bgImageMobile) || null;

		return {
			bgImageDesktopMedia,
			bgImageMobileMedia,
		};
	}),
)(Edit);

import { Button, PanelBody, PanelRow, ResponsiveWrapper, Spinner, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isURL } from '@wordpress/url';
import React, { useMemo, useState } from 'react';

const allowedMediaTypes = ['image'];
const instructions = <p>{__('To edit the image, you need permission to upload media.', 'rgbcode')}</p>;

export const Edit = () => {
	const [attributes, setAttributes] = useState({
		bgImageDesktop: null,
		bgImageMobile: null,
		src: '',
		text: '',
	});
	const [bgImageDesktopMedia, setBgImageDesktopMedia] = useState(null);
	const [bgImageMobileMedia, setBgImageMobileMedia] = useState(null);

	const isSrcValid = useMemo(() => {
		return '' === attributes.src || isURL(attributes.src);
	}, [attributes.src]);

	const handleMediaSelect = (image, type) => {
		setAttributes(prev => ({
			...prev,
			[type]: image.id,
		}));
		if (type === 'bgImageDesktop') {
			setBgImageDesktopMedia(image);
		} else {
			setBgImageMobileMedia(image);
		}
	};

	return (
		<>
			<PanelBody title={__('Settings')} initialOpen={true}>
				<PanelRow>
					<TextControl
						label={__('iFrame source URL', 'rgbcode')}
						type='url'
						value={attributes.src}
						onChange={value => setAttributes({ ...attributes, src: value })}
					/>
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
					<Button onClick={() => alert('Select Media (Desktop)')}>
						{!attributes.bgImageDesktop && __('Set Desktop Image', 'rgbcode')}
						{!!attributes.bgImageDesktop && !bgImageDesktopMedia && <Spinner />}
						{!!attributes.bgImageDesktop && bgImageDesktopMedia && (
							<ResponsiveWrapper naturalWidth={bgImageDesktopMedia?.media_details?.width} naturalHeight={bgImageDesktopMedia?.media_details?.height}>
								<img src={bgImageDesktopMedia.source_url} alt={__('Background Image (Desktop)', 'rgbcode')} />
							</ResponsiveWrapper>
						)}
					</Button>
				</div>

				<div className='components-base-control'>
					<Button onClick={() => alert('Select Media (Mobile)')}>
						{!attributes.bgImageMobile && __('Set Mobile Image', 'rgbcode')}
						{!!attributes.bgImageMobile && !bgImageMobileMedia && <Spinner />}
						{!!attributes.bgImageMobile && bgImageMobileMedia && (
							<ResponsiveWrapper naturalWidth={bgImageMobileMedia.media_details.width} naturalHeight={bgImageMobileMedia.media_details.height}>
								<img src={bgImageMobileMedia.source_url} alt={__('Background Image (Mobile)', 'rgbcode')} />
							</ResponsiveWrapper>
						)}
					</Button>
				</div>
			</PanelBody>
		</>
	);
};

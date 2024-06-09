import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, CheckboxControl, PanelBody, ResponsiveWrapper, Spinner, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';
import ArrowIcon from '../_components/arrow-svg';
import json from './block.json';

const { name } = json;
const allowedMediaTypes = ['image'];
const instructions = <p>{__('To edit the image, you need permission to upload media.', 'shi')}</p>;

const Edit = props => {
	const { attributes, setAttributes } = props;

	if (attributes?.cover) {
		return <img src={attributes.cover} style={{ width: '100%', height: 'auto' }} />;
	}

	const { slides, slidesMaxItems, autoplay } = attributes;

	const addSlide = () => {
		const slidesList = [...slides];
		slidesList.push({
			slideLabel: '',
			slideImage: 0,
			slideImageData: {},
			slideContentType: '',
			slideTitle: '',
			slideText: '',
			slideBtnText: '',
			slideBtnLink: '',
		});
		setAttributes({ slides: slidesList });
	};

	const removeSlide = index => {
		const slidesList = [...slides];
		slidesList.splice(index, 1);
		setAttributes({ slides: slidesList });
	};

	const moveSlide = (fromIndex, toIndex) => {
		const slidesList = [...slides];
		const [movedItem] = slidesList.splice(fromIndex, 1);
		slidesList.splice(toIndex, 0, movedItem);
		setAttributes({ slides: slidesList });
	};

	const changeSlideField = (field, value, index) => {
		const slidesList = [...slides];
		if (field === 'slideImageData') {
			value = {
				url: value.sizes['shi-block-slider']?.url || value.url,
				width: value.width,
				height: value.height,
			};
		}
		slidesList[index][field] = value;
		setAttributes({ slides: slidesList });

		setAttributes({ updateTime: Date.now() });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'shi')} initialOpen={true}>
					<CheckboxControl
						label={__('Autoplay', 'shi')}
						checked={autoplay}
						onChange={checked => {
							setAttributes({
								autoplay: checked,
							});
						}}
					/>
					<div className='shi-editor-block-hero-slider'>
						{slides.map((slide, index) => {
							return (
								<div className='shi-editor-block-hero-slider__item'>
									<PanelBody title={slide.slideLabel || __('Slide #', 'shi') + (index + 1)} initialOpen={false} className={'is-child'}>
										<div className='components-base-control'>
											<MediaUploadCheck fallback={instructions}>
												<MediaUpload
													title={__('Slide Background Image', 'shi')}
													onSelect={value => {
														changeSlideField('slideImage', value.id, index);
														changeSlideField('slideImageData', value, index);
													}}
													allowedTypes={allowedMediaTypes}
													value={slide.slideImage}
													render={({ open }) => (
														<>
															<p className='components-field-label'>{__('Background Image', 'shi')}</p>
															<Button
																className={`${!slide.slideImage ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}`}
																onClick={open}
															>
																{!slide.slideImage && __('Set Slide Image', 'shi')}
																{!!slide.slideImage && !Object.keys(slide.slideImageData) && <Spinner />}
																{!!slide.slideImage && Object.keys(slide.slideImageData).length && (
																	<ResponsiveWrapper naturalWidth={slide.slideImageData.width} naturalHeight={slide.slideImageData.height}>
																		<img src={slide.slideImageData.url} alt={__('Slide Image', 'shi')} />
																	</ResponsiveWrapper>
																)}
															</Button>
														</>
													)}
												/>
											</MediaUploadCheck>
											{!!slide.slideImage && (
												<MediaUploadCheck>
													<Button
														onClick={() => changeSlideField('slideImage', 0, index)}
														isDestructive
														style={{ marginTop: '8px' }}
														className='components-button btn-image-remove'
														label={__('Remove image', 'shi')}
													>
														{__('Remove image', 'shi')}
													</Button>
												</MediaUploadCheck>
											)}
										</div>

										<TextControl
											label={__('Slide Label', 'shi')}
											value={slide.slideLabel}
											onChange={value => changeSlideField('slideLabel', value, index)}
										/>

										<TextControl
											label={__('Content type', 'shi')}
											value={slide.slideContentType}
											onChange={value => changeSlideField('slideContentType', value, index)}
										/>

										<TextControl
											label={__('Title', 'shi')}
											value={slide.slideTitle}
											onChange={value => changeSlideField('slideTitle', value, index)}
										/>

										<TextareaControl
											label={__('Description', 'shi')}
											value={slide.slideText}
											onChange={value => changeSlideField('slideText', value, index)}
											rows='4'
										/>

										<TextControl
											label={__('Button Text', 'shi')}
											value={slide.slideBtnText}
											onChange={value => changeSlideField('slideBtnText', value, index)}
										/>

										<TextControl
											label={__('Button Link', 'shi')}
											value={slide.slideBtnLink}
											onChange={value => changeSlideField('slideBtnLink', value, index)}
										/>

										<CheckboxControl
											label={__('Open in the new tab', 'shi')}
											checked={slide.slideNewTabLink}
											onChange={value => changeSlideField('slideNewTabLink', value, index)}
										/>

										<Button variant='secondary' onClick={() => removeSlide(index)}>
											{__('Remove Slide', 'shi')}
										</Button>
									</PanelBody>

									<div className='shi-editor-block-hero-slider__order-buttons'>
										<Button variant='icon' onClick={() => moveSlide(index, index - 1)} disabled={index === 0}>
											<ArrowIcon />
										</Button>

										<Button variant='icon' onClick={() => moveSlide(index, index + 1)} disabled={index === slides.length - 1}>
											<ArrowIcon down />
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				</PanelBody>

				{slides !== 'undefined' && slidesMaxItems > slides.length && (
					<div className='components-panel__body is-opened'>
						<Button variant='secondary' onClick={addSlide.bind(this)}>
							{__('Add New Slide', 'shi')}
						</Button>
					</div>
				)}
			</InspectorControls>

			<div {...useBlockProps()}>
				<ServerSideRender block={name} httpMethod='POST' attributes={{ ...attributes }} urlQueryArgs={{ edit: 1 }} />
			</div>
		</>
	);
};

export default Edit;

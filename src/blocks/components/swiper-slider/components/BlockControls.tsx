/**
 * React dependencies.
 */
import React from 'react';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import metadata from '../block.json';

import { SwiperDirection, SwiperEffect, SwiperOptions } from '../types';
import { SwiperPaginationType } from '../types/modules/pagination';

import {
	SwiperDirectionOptions,
	SwiperEffectOptions,
	SwiperPaginationTypeOptions,
} from '../constants';
import { GridType } from '../types/modules/grid';

const { textdomain } = metadata;

interface SwiperSliderEditProps {
	attributes: SwiperOptions;
	setAttributes: (attr: Partial<SwiperOptions>) => void;
}

const BlockControlsComponent = ({ attributes, setAttributes }: SwiperSliderEditProps) => {
	const {
		initialSlide,
		speed,
		direction,
		loop,
		effect,
		slidesPerView,
		slidesPerGroup,
		spaceBetween,
		centeredSlides,
		keyboard,
		grabCursor,
		watchOverflow,
		autoplay,
		pagination,
		navigation,
		mousewheel,
		scrollbar,
		freeMode,
		parallax,
		thumbs,
		virtual,
		zoom,
		grid,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__('Settings', textdomain)} initialOpen={true}>
				<RangeControl
					label={__('Initial Slide', textdomain)}
					value={initialSlide}
					onChange={value => setAttributes({ initialSlide: value })}
					min={0}
					max={20}
				/>

				<RangeControl
					label={__('Speed', textdomain)}
					value={speed}
					onChange={value => setAttributes({ speed: value })}
					min={100}
					max={3000}
				/>

				<SelectControl
					label={__('Direction', textdomain)}
					value={direction}
					options={SwiperDirectionOptions}
					onChange={(value: string) => setAttributes({ direction: value as SwiperDirection })}
				/>

				<ToggleControl
					label={__('Loop', textdomain)}
					checked={loop}
					onChange={value => setAttributes({ loop: value })}
				/>

				<SelectControl
					label={__('Effect', textdomain)}
					value={effect}
					options={SwiperEffectOptions}
					onChange={(value: string) => setAttributes({ effect: value as SwiperEffect })}
				/>

				<ToggleControl
					label={__('Grab Cursor', textdomain)}
					checked={grabCursor}
					onChange={value => setAttributes({ grabCursor: value })}
				/>

				<ToggleControl
					label={__('Watch Overflow', textdomain)}
					checked={watchOverflow}
					onChange={value => setAttributes({ watchOverflow: value })}
				/>
			</PanelBody>

			<PanelBody title={__('Grid Settings', textdomain)} initialOpen={false}>
				<RangeControl
					label={__('Number of Rows', textdomain)}
					value={grid.rows}
					onChange={value => setAttributes({ grid: { ...grid, rows: value } })}
					min={1}
					max={10}
				/>

				<SelectControl
					label={__('Fill Method', textdomain)}
					value={grid.fill}
					options={[
						{ label: __('Column', textdomain), value: GridType.Column },
						{ label: __('Row', textdomain), value: GridType.Row },
					]}
					onChange={value => setAttributes({ grid: { ...grid, fill: value } })}
				/>
			</PanelBody>

			<PanelBody title={__('Slides Settings', textdomain)} initialOpen={false}>
				<RangeControl
					label={__('Slides Per View', textdomain)}
					value={slidesPerView as number}
					min={1}
					max={10}
					onChange={value => setAttributes({ slidesPerView: value })}
				/>

				<RangeControl
					label={__('Slides Per Group', textdomain)}
					value={slidesPerGroup}
					min={1}
					max={10}
					onChange={value => setAttributes({ slidesPerGroup: value })}
				/>

				<RangeControl
					label={__('Space Between', textdomain)}
					value={spaceBetween}
					onChange={value => setAttributes({ spaceBetween: value })}
					min={0}
					max={100}
				/>

				<ToggleControl
					label={__('Centered Slides', textdomain)}
					checked={centeredSlides}
					onChange={value => setAttributes({ centeredSlides: value })}
				/>
			</PanelBody>

			<PanelBody title={__('Autoplay Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Autoplay', textdomain)}
					checked={autoplay.enabled}
					onChange={value =>
						setAttributes({
							autoplay: { ...autoplay, enabled: value },
						})
					}
				/>

				{autoplay && (
					<>
						<RangeControl
							label={__('Autoplay Delay', textdomain)}
							value={autoplay.delay}
							onChange={value => setAttributes({ autoplay: { ...autoplay, delay: value } })}
							min={1000}
							max={10000}
						/>

						<ToggleControl
							label={__('Stop On Last Slide', textdomain)}
							checked={autoplay.stopOnLastSlide}
							onChange={value =>
								setAttributes({ autoplay: { ...autoplay, stopOnLastSlide: value } })
							}
						/>

						<ToggleControl
							label={__('Disable On Interaction', textdomain)}
							checked={autoplay.disableOnInteraction}
							onChange={value =>
								setAttributes({ autoplay: { ...autoplay, disableOnInteraction: value } })
							}
						/>

						<ToggleControl
							label={__('Reverse Direction', textdomain)}
							checked={autoplay.reverseDirection}
							onChange={value =>
								setAttributes({ autoplay: { ...autoplay, reverseDirection: value } })
							}
						/>

						<ToggleControl
							label={__('Wait For Transition', textdomain)}
							checked={autoplay.waitForTransition}
							onChange={value =>
								setAttributes({ autoplay: { ...autoplay, waitForTransition: value } })
							}
						/>

						<ToggleControl
							label={__('Pause On Mouse Enter', textdomain)}
							checked={autoplay.pauseOnMouseEnter}
							onChange={value =>
								setAttributes({ autoplay: { ...autoplay, pauseOnMouseEnter: value } })
							}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody title={__('Navigation Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Navigation', textdomain)}
					checked={navigation?.enabled}
					onChange={value => setAttributes({ navigation: { ...navigation, enabled: value } })}
				/>
			</PanelBody>

			<PanelBody title={__('Pagination Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Pagination', textdomain)}
					checked={pagination?.enabled}
					onChange={value =>
						setAttributes({
							pagination: { ...pagination, enabled: value },
						})
					}
				/>

				{pagination?.enabled && (
					<>
						<SelectControl
							label={__('Pagination Type', textdomain)}
							value={pagination?.type}
							options={SwiperPaginationTypeOptions}
							onChange={(value: string) =>
								setAttributes({
									pagination: { ...pagination, type: value as SwiperPaginationType },
								})
							}
						/>

						<ToggleControl
							label={__('Clickable Pagination', textdomain)}
							checked={pagination?.clickable}
							onChange={value =>
								setAttributes({
									pagination: { ...pagination, clickable: value },
								})
							}
						/>

						<ToggleControl
							label={__('Hide on Click', textdomain)}
							checked={pagination?.hideOnClick}
							onChange={value =>
								setAttributes({
									pagination: { ...pagination, hideOnClick: value },
								})
							}
						/>

						<ToggleControl
							label={__('Progressbar Opposite', textdomain)}
							checked={pagination?.progressbarOpposite}
							onChange={value =>
								setAttributes({
									pagination: { ...pagination, progressbarOpposite: value },
								})
							}
						/>

						{pagination?.type === SwiperPaginationType.Bullets && (
							<>
								<ToggleControl
									label={__('Dynamic Bullets', textdomain)}
									checked={pagination?.dynamicBullets}
									onChange={value =>
										setAttributes({
											pagination: { ...pagination, dynamicBullets: value },
										})
									}
								/>

								<RangeControl
									label={__('Dynamic Main Bullets', textdomain)}
									value={pagination?.dynamicMainBullets}
									min={1}
									max={5}
									onChange={value =>
										setAttributes({
											pagination: { ...pagination, dynamicMainBullets: value },
										})
									}
								/>
							</>
						)}
					</>
				)}
			</PanelBody>

			<PanelBody title={__('Mousewheel Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Mousewheel Control', textdomain)}
					checked={mousewheel.enabled}
					onChange={value => setAttributes({ mousewheel: { ...mousewheel, enabled: value } })}
				/>

				{mousewheel.enabled && (
					<>
						<ToggleControl
							label={__('Force to Axis', textdomain)}
							checked={mousewheel.forceToAxis}
							onChange={value =>
								setAttributes({ mousewheel: { ...mousewheel, forceToAxis: value } })
							}
						/>

						<ToggleControl
							label={__('Release on Edges', textdomain)}
							checked={mousewheel.releaseOnEdges}
							onChange={value =>
								setAttributes({
									mousewheel: { ...mousewheel, releaseOnEdges: value },
								})
							}
						/>

						<ToggleControl
							label={__('Invert Sliding Direction', textdomain)}
							checked={mousewheel.invert}
							onChange={value => setAttributes({ mousewheel: { ...mousewheel, invert: value } })}
						/>

						<RangeControl
							label={__('Sensitivity', textdomain)}
							value={mousewheel.sensitivity}
							onChange={value =>
								setAttributes({ mousewheel: { ...mousewheel, sensitivity: value } })
							}
							min={0}
							max={5}
						/>

						<RangeControl
							label={__('Threshold Delta', textdomain)}
							value={mousewheel.thresholdDelta || 0}
							onChange={value =>
								setAttributes({
									mousewheel: {
										...mousewheel,
										thresholdDelta: value,
									},
								})
							}
							min={0}
							max={100}
						/>

						<RangeControl
							label={__('Threshold Time (ms)', textdomain)}
							value={mousewheel.thresholdTime}
							onChange={value =>
								setAttributes({
									mousewheel: {
										...mousewheel,
										thresholdTime: value,
									},
								})
							}
							min={0}
							max={1000}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody title={__('Scrollbar Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Scrollbar', textdomain)}
					checked={scrollbar?.enabled}
					onChange={value => setAttributes({ scrollbar: { ...scrollbar, enabled: value } })}
				/>
			</PanelBody>

			<PanelBody title={__('Free Mode Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Free Mode', textdomain)}
					checked={freeMode.enabled}
					onChange={value => setAttributes({ freeMode: { ...freeMode, enabled: value } })}
				/>
				{freeMode.enabled && (
					<>
						<ToggleControl
							label={__('Enable Momentum', textdomain)}
							checked={freeMode.momentum}
							onChange={value => setAttributes({ freeMode: { ...freeMode, momentum: value } })}
						/>

						<RangeControl
							label={__('Momentum Ratio', textdomain)}
							value={freeMode.momentumRatio}
							onChange={value => setAttributes({ freeMode: { ...freeMode, momentumRatio: value } })}
							min={0}
							max={5}
						/>

						<RangeControl
							label={__('Momentum Velocity Ratio', textdomain)}
							value={freeMode.momentumVelocityRatio}
							onChange={value =>
								setAttributes({
									freeMode: { ...freeMode, momentumVelocityRatio: value },
								})
							}
							min={0}
							max={5}
						/>

						<ToggleControl
							label={__('Enable Momentum Bounce', textdomain)}
							checked={freeMode.momentumBounce}
							onChange={value =>
								setAttributes({ freeMode: { ...freeMode, momentumBounce: value } })
							}
						/>

						<RangeControl
							label={__('Momentum Bounce Ratio', textdomain)}
							value={freeMode.momentumBounceRatio}
							onChange={value =>
								setAttributes({
									freeMode: { ...freeMode, momentumBounceRatio: value },
								})
							}
							min={0}
							max={5}
						/>

						<RangeControl
							label={__('Minimum Velocity', textdomain)}
							value={freeMode.minimumVelocity}
							onChange={value =>
								setAttributes({ freeMode: { ...freeMode, minimumVelocity: value } })
							}
							min={0}
							max={1}
							step={0.01}
						/>

						<ToggleControl
							label={__('Enable Sticky', textdomain)}
							checked={freeMode.sticky}
							onChange={value => setAttributes({ freeMode: { ...freeMode, sticky: value } })}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody title={__('Parallax Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Parallax', textdomain)}
					checked={parallax.enabled}
					onChange={value => setAttributes({ parallax: { ...parallax, enabled: value } })}
				/>
			</PanelBody>

			<PanelBody title={__('Thumbs Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Multiple Active Thumbs', textdomain)}
					checked={thumbs.multipleActiveThumbs}
					onChange={value => setAttributes({ thumbs: { ...thumbs, multipleActiveThumbs: value } })}
				/>
			</PanelBody>

			<PanelBody title={__('Virtual Slides Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Virtual Slides', textdomain)}
					checked={virtual.enabled}
					onChange={value => setAttributes({ virtual: { ...virtual, enabled: value } })}
				/>

				{virtual.enabled && (
					<>
						<ToggleControl
							label={__('Enable DOM Cache', textdomain)}
							checked={virtual.cache}
							onChange={value => setAttributes({ virtual: { ...virtual, cache: value } })}
						/>

						<RangeControl
							label={__('Slides Before Active', textdomain)}
							value={virtual.addSlidesBefore}
							onChange={value => setAttributes({ virtual: { ...virtual, addSlidesBefore: value } })}
							min={0}
							max={10}
						/>

						<RangeControl
							label={__('Slides After Active', textdomain)}
							value={virtual.addSlidesAfter}
							onChange={value => setAttributes({ virtual: { ...virtual, addSlidesAfter: value } })}
							min={0}
							max={10}
						/>

						<ToggleControl
							label={__('Enable External Update', textdomain)}
							checked={virtual.renderExternalUpdate}
							onChange={value =>
								setAttributes({
									virtual: { ...virtual, renderExternalUpdate: value },
								})
							}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody title={__('Zoom Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Limit to Original Size', textdomain)}
					checked={zoom.limitToOriginalSize}
					onChange={value => setAttributes({ zoom: { ...zoom, limitToOriginalSize: value } })}
				/>

				<RangeControl
					label={__('Max Zoom Ratio', textdomain)}
					value={zoom.maxRatio}
					onChange={value => setAttributes({ zoom: { ...zoom, maxRatio: value } })}
					min={1}
					max={10}
					step={0.1}
				/>

				<RangeControl
					label={__('Min Zoom Ratio', textdomain)}
					value={zoom.minRatio}
					onChange={value => setAttributes({ zoom: { ...zoom, minRatio: value } })}
					min={1}
					max={10}
					step={0.1}
				/>

				<ToggleControl
					label={__('Enable Double Tap Zoom', textdomain)}
					checked={zoom.toggle}
					onChange={value => setAttributes({ zoom: { ...zoom, toggle: value } })}
				/>
			</PanelBody>

			<PanelBody title={__('Keyboard Settings', textdomain)} initialOpen={false}>
				<ToggleControl
					label={__('Enable Keyboard Control', textdomain)}
					checked={keyboard.enabled}
					onChange={value => setAttributes({ keyboard: { ...keyboard, enabled: value } })}
				/>

				<ToggleControl
					label={__('Control Only In Viewport', textdomain)}
					checked={keyboard.onlyInViewport}
					onChange={value => setAttributes({ keyboard: { ...keyboard, onlyInViewport: value } })}
				/>

				<ToggleControl
					label={__('Enable Page Up/Down Navigation', textdomain)}
					checked={keyboard.pageUpDown}
					onChange={value => setAttributes({ keyboard: { ...keyboard, pageUpDown: value } })}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default BlockControlsComponent;

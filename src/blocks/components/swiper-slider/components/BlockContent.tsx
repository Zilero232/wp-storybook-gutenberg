/**
 * React dependencies.
 */
import React from 'react';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies.
 */
import { Swiper, SwiperSlide } from 'swiper/react';

/**
 * Internal dependencies.
 */
import metadata from '../block.json';

import { SwiperOptions } from '../types';

const { name } = metadata;

interface BlockContent {
	attributes: SwiperOptions;
}

const BlockContent = ({ attributes }: BlockContent) => {
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
	} = attributes;

	return (
		<div {...useBlockProps()}>
			<Swiper initialSlide={initialSlide}>
				{Array.from({ length: 10 }).map((_, index) => (
					<SwiperSlide key={index}>Slide {index + 1}</SwiperSlide>
				))}

				{pagination.enabled && <div className='swiper-pagination' />}

				{navigation.enabled && (
					<>
						<div className='swiper-button-prev' />
						<div className='swiper-button-next' />
					</>
				)}

				{scrollbar.enabled && <div className='swiper-scrollbar' />}
			</Swiper>
		</div>
	);
};

export default BlockContent;

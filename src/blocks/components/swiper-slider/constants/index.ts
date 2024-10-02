/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { textdomain } from '../block.json';

import { SwiperDirection, SwiperEffect } from '../types';
import { SwiperPaginationType } from '../types/modules/Pagination';

export const SwiperDirectionOptions = [
	{ label: __('Horizontal', textdomain), value: SwiperDirection.Horizontal },
	{ label: __('Vertical', textdomain), value: SwiperDirection.Vertical },
];

export const SwiperEffectOptions = [
	{ label: __('Slide', textdomain), value: SwiperEffect.Slide },
	{ label: __('Fade', textdomain), value: SwiperEffect.Fade },
	{ label: __('Cube', textdomain), value: SwiperEffect.Cube },
	{ label: __('Coverflow', textdomain), value: SwiperEffect.Coverflow },
	{ label: __('Flip', textdomain), value: SwiperEffect.Flip },
];

export const SwiperPaginationTypeOptions = [
	{ label: __('Bullets', textdomain), value: SwiperPaginationType.Bullets },
	{ label: __('Fraction', textdomain), value: SwiperPaginationType.Fraction },
	{ label: __('Progressbar', textdomain), value: SwiperPaginationType.Progressbar },
	{ label: __('Custom', textdomain), value: SwiperPaginationType.Custom },
];

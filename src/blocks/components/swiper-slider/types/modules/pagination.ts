export enum SwiperPaginationType {
	Bullets = 'bullets',
	Fraction = 'fraction',
	Progressbar = 'progressbar',
	Custom = 'custom',
}

export type SwiperPaginationTypeType = keyof typeof SwiperPaginationType;

export interface PaginationOptions {
	/**
	 * Boolean property to use with breakpoints to enable/disable pagination on certain breakpoints
	 */
	enabled?: boolean;

	/**
	 * String with type of pagination. Can be `'bullets'`, `'fraction'`, `'progressbar'` or `'custom'`
	 *
	 * @default 'bullets'
	 */
	type?: SwiperPaginationType;

	/**
	 * Defines which HTML tag will be used to represent single pagination bullet. Only for `'bullets'` pagination type.
	 *
	 * @default 'span'
	 */
	bulletElement?: string;

	/**
	 * Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time.
	 *
	 * @default false
	 */
	dynamicBullets?: boolean;

	/**
	 * The number of main bullets visible when `dynamicBullets` enabled.
	 *
	 * @default 1
	 */
	dynamicMainBullets?: number;

	/**
	 * Toggle (hide/show) pagination container visibility after click on Slider's container
	 *
	 * @default true
	 */
	hideOnClick?: boolean;

	/**
	 * If `true` then clicking on pagination button will cause transition to appropriate slide. Only for bullets pagination type
	 *
	 * @default false
	 */
	clickable?: boolean;

	/**
	 * Makes pagination progressbar opposite to Swiper's `direction` parameter, means vertical progressbar for horizontal swiper
	 * direction and horizontal progressbar for vertical swiper direction
	 *
	 * @default false
	 */
	progressbarOpposite?: boolean;
}

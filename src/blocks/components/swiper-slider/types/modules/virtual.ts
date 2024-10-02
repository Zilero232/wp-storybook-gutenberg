export interface VirtualOptions<T = any> {
	/**
	 * Whether the virtual slides are enabled
	 *
	 * @default false
	 */
	enabled: boolean;

	/**
	 * Array with slides
	 *
	 * @default []
	 */
	slides: T[];

	/**
	 * Enables DOM cache of rendering slides html elements. Once they are rendered they will be saved to cache and reused from it.
	 *
	 * @default true
	 */
	cache: boolean;

	/**
	 * Increases amount of pre-rendered slides before active slide
	 *
	 * @default 0
	 */
	addSlidesBefore: number;

	/**
	 * Increases amount of pre-rendered slides after active slide
	 *
	 * @default 0
	 */
	addSlidesAfter: number;

	/**
	 * When enabled (by default) it will update Swiper layout right after renderExternal called. Useful to disable and update swiper manually when used with render libraries that renders asynchronously
	 *
	 * @default true
	 */
	renderExternalUpdate: boolean;
}

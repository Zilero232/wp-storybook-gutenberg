export interface mousewheel {
	/**
	 * Set to `true` to enable mousewheel control
	 *
	 * @default false
	 */
	enabled?: boolean;

	/**
	 * Set to `true` to force mousewheel swipes to axis. So in horizontal mode mousewheel will work only with horizontal mousewheel scrolling, and only with vertical scrolling in vertical mode.
	 *
	 * @default false
	 */
	forceToAxis: boolean;

	/**
	 * Set to `true` and swiper will release mousewheel event and allow page scrolling when swiper is on edge positions (in the beginning or in the end)
	 *
	 * @default false
	 */
	releaseOnEdges: boolean;

	/**
	 * Set to `true` to invert sliding direction
	 *
	 * @default false
	 */
	invert: boolean;

	/**
	 * Multiplier of mousewheel data, allows to tweak mouse wheel sensitivity
	 *
	 * @default 1
	 */
	sensitivity: number;

	/**
	 * Minimum mousewheel scroll delta to trigger swiper slide change
	 *
	 * @default null
	 */
	thresholdDelta: number;

	/**
	 * Minimum mousewheel scroll time delta (in ms) to trigger swiper slide change
	 *
	 * @default null
	 */
	thresholdTime: number;
}

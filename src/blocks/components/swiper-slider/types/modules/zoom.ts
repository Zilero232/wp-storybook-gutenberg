export interface ZoomOptions {
	/**
	 * When set to true, the image will not be scaled past 100% of its original size
	 *
	 * @default false
	 */
	limitToOriginalSize: boolean;

	/**
	 * Maximum image zoom multiplier
	 *
	 * @default 3
	 */
	maxRatio: number;

	/**
	 * Minimal image zoom multiplier
	 *
	 * @default 1
	 */
	minRatio: number;

	/**
	 * Enable/disable zoom-in by slide's double tap
	 *
	 * @default true
	 */
	toggle: boolean;
}

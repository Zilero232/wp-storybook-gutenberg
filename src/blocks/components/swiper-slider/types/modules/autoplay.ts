export interface AutoplayOptions {
	/**
	 * Enable autoplay
	 *
	 * @default false
	 */
	enabled?: boolean;

	/**
	 * Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled
	 *
	 * @default 3000
	 */
	delay?: number;

	/**
	 * Enable this parameter and autoplay will be stopped when it reaches last slide (has no effect in loop mode)
	 *
	 * @default false
	 */
	stopOnLastSlide?: boolean;

	/**
	 * Set to `false` and autoplay will not be disabled after user interactions (swipes),
	 * it will be restarted every time after interaction
	 *
	 * @default true
	 */
	disableOnInteraction?: boolean;

	/**
	 * Enables autoplay in reverse direction
	 *
	 * @default false
	 */
	reverseDirection?: boolean;

	/**
	 * When enabled autoplay will wait for wrapper transition to continue.
	 * Can be disabled in case of using Virtual Translate when your
	 * slider may not have transition
	 *
	 * @default true
	 */
	waitForTransition?: boolean;

	/**
	 * When enabled autoplay will be paused on pointer (mouse) enter over Swiper container.
	 *
	 * @default false
	 */
	pauseOnMouseEnter?: boolean;
}

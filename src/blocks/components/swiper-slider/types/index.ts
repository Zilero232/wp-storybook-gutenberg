import { AutoplayOptions } from './modules/autoplay';
import { FreeModeOptions } from './modules/freeMode';
import { GridOptions } from './modules/grid';
import { KeyboardOptions } from './modules/keyboard';
import { mousewheel } from './modules/mousewheel';
import { NavigationOptions } from './modules/navigation';
import { PaginationOptions } from './modules/pagination';
import { ParallaxOptions } from './modules/parallax';
import { ScrollbarOptions } from './modules/scrollbar';
import { ThumbsOptions } from './modules/thumbs';
import { VirtualOptions } from './modules/virtual';
import { ZoomOptions } from './modules/zoom';

// Enums
export enum SwiperDirection {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
}

export enum SwiperEffect {
	Slide = 'slide',
	Fade = 'fade',
	Cube = 'cube',
	Coverflow = 'coverflow',
	Flip = 'flip',
	Creative = 'creative',
	Cards = 'cards',
}

// Value Types
export type SwiperDirectionType = keyof typeof SwiperDirection;
export type SwiperEffectType = keyof typeof SwiperEffect;

export interface SwiperOptions {
	/**
	 * Index number of initial slide.
	 *
	 * @default 10
	 */
	initialSlide: number;

	/**
	 * Duration of transition between slides (in ms)
	 *
	 * @default 300
	 */
	speed: number;

	/**
	 * Can be `'horizontal'` or `'vertical'` (for vertical slider).
	 *
	 * @default 'horizontal'
	 */
	direction: SwiperDirection;

	/**
	 * When enabled, will swipe slides only forward (one-way) regardless of swipe direction
	 *
	 * @default false
	 */

	oneWayMovement: boolean;

	/**
	 * If total number of slides less than specified here value, then Swiper will enable `backface-visibility: hidden` on slide elements to reduce visual "flicker" in Safari.
	 *
	 * @note It is not recommended to enable it on large amount of slides as it will reduce performance
	 *
	 * @default 10
	 */
	maxBackfaceHiddenSlides: number;

	/**
	 * If `true`, Swiper will accept mouse events like touch events (click and drag to change slides)
	 *
	 * @default true
	 */
	simulateTouch: boolean;

	/**
	 * Set to `false` if you want to disable short swipes
	 *
	 * @default true
	 */
	shortSwipes: boolean;

	/**
	 * Set to `false` if you want to disable long swipes
	 *
	 * @default true
	 */
	longSwipes: boolean;

	/**
	 * Ratio to trigger swipe to next/previous slide during long swipes
	 *
	 * @default 0.5
	 */
	longSwipesRatio: number;

	/**
	 * Minimal duration (in ms) to trigger swipe to next/previous slide during long swipes
	 *
	 * @default 300
	 */
	longSwipesMs: number;

	/**
	 * Set to `true` to enable continuous loop mode
	 *
	 * Because of nature of how the loop mode works (it will rearrange slides), total number of slides must be:
	 *
	 * - more than or equal to `slidesPerView` + `slidesPerGroup`
	 * - even to `slidesPerGroup` (or use `loopAddBlankSlides` parameter)
	 * - even to `grid.rows` (or use `loopAddBlankSlides` parameter)
	 *
	 * @default false
	 *
	 */
	loop: boolean;

	/**
	 * Transition effect. Can be `'slide'`, `'fade'`, `'cube'`, `'coverflow'`, `'flip'`, `'creative'` or `'cards'`
	 *
	 * @default 'slide'
	 */
	effect: SwiperEffect;

	/**
	 * Number of slides per view (slides visible at the same time on slider's container).
	 * @note `slidesPerView: 'auto'` is currently not compatible with multirow mode, when `grid.rows` > 1
	 *
	 * @default 1
	 */
	slidesPerView: number | 'auto';

	/**
	 * Set numbers of slides to define and enable group sliding. Useful to use with slidesPerView > 1
	 *
	 * @default 1
	 */
	slidesPerGroup: number;

	/**
	 * Distance between slides in px.
	 *
	 * @default 0
	 *
	 * @note If you use "margin" css property to the elements which go into Swiper in which you pass "spaceBetween" into, navigation might not work properly.
	 */
	spaceBetween: number;

	/**
	 * If `true`, then active slide will be centered, not always on the left side.
	 *
	 * @default false
	 */
	centeredSlides: boolean;

	/**
	 * Enables free mode functionality. Object with free mode parameters to enable with default settings.
	 */
	freeMode: FreeModeOptions;

	/**
	 * This option may a little improve desktop usability. If `true`, user will see the "grab" cursor when hover on Swiper
	 *
	 * @default false
	 */
	grabCursor: boolean;

	/**
	 * When enabled Swiper will be disabled and hide navigation buttons on
	 * case there are not enough slides for sliding.
	 *
	 * @default true
	 */
	watchOverflow: boolean;

	/**
	 * Object with parallax parameters to enable with default settings.
	 */
	parallax: ParallaxOptions;

	/**
	 * Object with autoplay parameters to enable with default settings
	 */
	autoplay: AutoplayOptions;

	/**
	 * Object with thumbs component parameters
	 */
	thumbs: ThumbsOptions;

	/**
	 * Enables virtual slides functionality. Object with virtual slides parameters to enable with default settings.
	 */
	virtual: VirtualOptions;

	/**
	 * Object with pagination parameters to enable with default settings.
	 */
	pagination: PaginationOptions;

	/**
	 * Object with navigation parameters to enable with default settings.
	 */
	navigation: NavigationOptions;

	/**
	 * Object with scrollbar parameters to enable with default settings.
	 */
	scrollbar: ScrollbarOptions;

	/**
	 * Enables navigation through slides using mouse wheel. Object with mousewheel parameters to enable with default settings
	 */
	mousewheel: mousewheel;

	/**
	 * Enables zooming functionality. Object with zoom parameters to enable with default settings
	 */
	zoom: ZoomOptions;

	/**
	 * Enables navigation through slides using keyboard. Object with keyboard parameters to enable with default settings
	 */
	keyboard: KeyboardOptions;

	/**
	 * Object with grid parameters to enable "multirow" slider.
	 */
	grid: GridOptions;

	/**
	 * Enables navigation through slides using keyboard. Object with keyboard parameters to enable with default settings
	 */
	lazy: {
		/**
		 * Number of next and previous slides to preload. Only applicable if using lazy loading.
		 *
		 * @default 0
		 */
		loadPrevNext: number;
	};
}

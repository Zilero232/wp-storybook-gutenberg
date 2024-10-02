export interface ScrollbarOptions {
	/**
	 * Boolean property to use with breakpoints to enable/disable scrollbar on certain breakpoints
	 */
	enabled: boolean;

	/**
	 * Hide scrollbar automatically after user interaction
	 *
	 * @default true
	 */
	hide: boolean;

	/**
	 * Set to `true` to enable make scrollbar draggable that allows you to control slider position
	 *
	 * @default false
	 */
	draggable: boolean;

	/**
	 * Set to `true` to snap slider position to slides when you release scrollbar
	 *
	 * @default false
	 */
	snapOnRelease: boolean;

	/**
	 * Size of scrollbar draggable element in px
	 *
	 * @default 'auto'
	 */
	dragSize: 'auto' | number;
}

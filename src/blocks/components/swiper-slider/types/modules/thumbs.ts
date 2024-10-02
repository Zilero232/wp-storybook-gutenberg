export interface ThumbsOptions {
	/**
	 * When enabled multiple thumbnail slides may get activated
	 *
	 * @default true
	 */
	multipleActiveThumbs: boolean;

	/**
   * Allows to set on which thumbs active slide from edge it should automatically move scroll thumbs. For example, if set to 1 and last visible thumb will be activated (1 from edge) it will auto scroll thumbs

   *
   * @default 0
   */
	autoScrollOffset: number;
}

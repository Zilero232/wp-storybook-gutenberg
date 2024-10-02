/**
 * External dependencies
 */
import {
	GroupBase,
	MultiValueGenericProps,
	MultiValueProps,
	StylesConfig,
} from 'react-select';

export interface SelectProps {
	/**
	 * Focus the control when it is mounted
	 */
	autoFocus?: boolean;
	/**
	 * Remove the currently focused option when the user presses backspace when Select isClearable or isMulti
	 */
	backspaceRemovesValue: boolean;
	/**
	 * Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices)
	 */
	blurInputOnSelect: boolean;
	/**
	 * Close the select menu when the user selects an option
	 */
	closeMenuOnSelect: boolean;
	/**
	 * Whether the value of the select, e.g. SingleValue, should be displayed in the control.
	 */
	controlShouldRenderValue: boolean;
	/**
	 * Hide the selected option from the menu
	 */
	hideSelectedOptions?: boolean;
	/**
	 * Is the select value clearable
	 */
	isClearable?: boolean;
	/**
	 * Is the select disabled
	 */
	isDisabled: boolean;
	/**
	 * Is the select in a state of loading (async)
	 */
	isLoading: boolean;
	/**
	 * Is the select direction right-to-left
	 */
	isRtl: boolean;
	/**
	 * Whether to enable search functionality
	 */
	isSearchable: boolean;
	/**
	 * Minimum height of the menu before flipping
	 */
	minMenuHeight: number;
	/**
	 *  Maximum height of the menu before scrolling
	 */
	maxMenuHeight: number;
	/**
	 * Whether the menu is open
	 */
	menuIsOpen: boolean;
	/**
	 * The size of the button.
	 *
	 * - `'auto'`: For normal text-label buttons, unless it is a toggle button.
	 * - `'bottom'`: For toggle buttons, icon buttons, and buttons when used in context of either.
	 * - `'top'`: For icon buttons associated with more advanced or auxiliary features.
	 *
	 * If the deprecated `isSmall` prop is also defined, this prop will take precedence.
	 *
	 * @default 'auto'
	 */
	menuPlacement: 'auto' | 'bottom' | 'top';
	/**
	 * The CSS position value of the menu, when "fixed" extra layout management is required
	 */
	menuPosition: 'absolute' | 'fixed';
	/**
	 *  Whether to block scroll events when the menu is open
	 */
	menuShouldBlockScroll: boolean;
	/**
	 * Whether the menu should be scrolled into view when it opens
	 */
	menuShouldScrollIntoView: boolean;
	/**
	 * Allows control of whether the menu is opened when the Select is focused
	 */
	openMenuOnFocus: boolean;
	/**
	 * Allows control of whether the menu is opened when the Select is clicked
	 */
	openMenuOnClick: boolean;
	/**
	 * Remove all non-essential styles
	 */
	unstyled: boolean;
}

export interface Option {
	label: string;
	value: string;
}

export type CustomStyles = StylesConfig<Option, true>;

export type SortableMultiValueLabelProps = MultiValueGenericProps<
	Option,
	true,
	GroupBase<Option>
>;

export type SortableMultiValueProps = MultiValueProps<
	Option,
	true,
	GroupBase<Option>
>;

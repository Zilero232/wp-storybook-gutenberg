export type ButtonProps = {
	/**
	 * An accessible description for the button.
	 */
	describedBy?: string;
	/**
	 *  Whether the button is disabled. If true, this will force a button element to be rendered, even when an href is given.
	 */
	disabled?: boolean;
	/**
	 * If provided, renders a instead of button.
	 */
	href?: string;
	/**
	 * If provided, renders an Icon component inside the button.
	 */
	// icon: IconProps<unknown>['icon'];
	/**
	 * If provided with `icon`, sets the position of icon relative to the `text`.
	 *
	 * @default 'left'
	 */
	iconPosition?: 'left' | 'right';
	/**
	 * If provided with icon, sets the icon size. Please refer to the Icon component for more details regarding the default value of its size prop.
	 */
	// iconSize: IconProps<unknown>['size'];
	/**
	 * Indicates activity while a action is being performed.
	 */
	isBusy?: boolean;
	/**
	 *  Renders a red text-based button style to indicate destructive behavior.
	 */
	isDestructive?: boolean;
	/**
	 * Deprecated: Renders a button with an anchor style. Use variant prop with link value instead.
	 */
	isLink?: boolean;
	/**
	 * Renders a pressed button style. If the native aria-pressed attribute is also set, it will take precedence.
	 */
	isPressed?: boolean;
	/**
	 * Deprecated: Renders a primary button style. Use variant prop with primary value instead.
	 */
	isPrimary?: boolean;
	/**
	 * Deprecated: Renders a default button style. Use variant prop with secondary value instead.
	 */
	isSecondary?: boolean;
	/**
	 * Decreases the size of the button. Deprecated in favor of the size prop. If both props are defined, the size prop will take precedence.
	 */
	isSmall?: boolean;
	/**
	 * Deprecated: Renders a text-based button style. Use variant prop with tertiary value instead.
	 */
	isTertiary?: boolean;
	/**
	 * Sets the aria-label of the component, if none is provided. Sets the Tooltip content if showTooltip is provided.
	 */
	label?: string;
	/**
	 * If provided with `showTooltip`, appends the Shortcut label to the tooltip content.
	 * If an object is provided, it should contain `display` and `ariaLabel` keys.
	 *
	 */
	shortcut?: string | { display: string; ariaLabel: string };
	/**
	 * If provided, renders a Tooltip component for the button.
	 */
	showTooltip?: boolean;
	/**
	 * The size of the button.
	 *
	 * - `'default'`: For normal text-label buttons, unless it is a toggle button.
	 * - `'compact'`: For toggle buttons, icon buttons, and buttons when used in context of either.
	 * - `'small'`: For icon buttons associated with more advanced or auxiliary features.
	 *
	 * If the deprecated `isSmall` prop is also defined, this prop will take precedence.
	 *
	 * @default 'default'
	 */
	size?: 'default' | 'compact' | 'small';
	/**
	 * If provided with href, sets the target attribute to the a.
	 */
	target?: string;
	/**
	 * If provided, displays the given text inside the button. If the button contains children elements, the text is displayed before them.
	 */
	text?: string;
	/**
	 * If provided with show Tooltip, sets the position of the tooltip. Please refer to the Tooltip component for more details regarding the defaults.
	 */
	// tooltipPosition: PopoverProps['position'];
	/**
	 * Specifies the button's style.
	 * The accepted values are:
	 * 'primary' (the primary button styles)
	 * 'secondary' (the default button styles)
	 * 'tertiary' (the text-based button styles)
	 * 'link' (the link button styles)
	 */
	variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
};

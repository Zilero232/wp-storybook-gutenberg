/**
 * WordPress dependencies
 */
import uniqueId from 'lodash/uniqueId';
import { useRef, useEffect, useMemo, useCallback, createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { prependHTTP } from '@wordpress/url';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { insert, isCollapsed, applyFormat } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { createLinkFormat, validateLinkId, anchorRef } from './utils';

/**
 * LinkControl calls `onChange` immediately upon the toggling a setting.
 *
 * @param {object} nextValue The next link URL.
 * @param {object} linkValue The link value.
 *
 * @returns {boolean} Whether the link rel should be sponsored.
 */
const isToggleSetting = (nextValue, linkValue) => {
	return (
		linkValue.url === nextValue.url &&
		(linkValue.opensInNewTab !== nextValue.opensInNewTab || linkValue.noFollow !== nextValue.noFollow || linkValue.sponsored !== nextValue.sponsored)
	);
};

/**
 * Gets the new text for the link.
 * @param {object} nextValue The next link Title.
 * @param {string} newUrl The new link URL.
 *
 * @returns {string} The new text for the link.
 */
const getNewText = (nextValue, newUrl) => {
	return nextValue.title ? nextValue.title : newUrl;
};

/**
 * Should insert new link.
 * @returns {boolean} Whether the link rel should be sponsored.
 */
const shouldInsertLink = (value, isActive) => {
	return isCollapsed(value) && !isActive;
};

/**
 * Component to render the inline link UI.
 * This component is rendered when adding or editing a
 * link.
 */
function InlineLinkUI({ isActive, activeAttributes, addingLink, value, onChange, stopAddingLink }) {
	// Set the basic data
	const { url, type, id, target, rel } = activeAttributes;
	const prependRel = rel?.split(' ');
	const linkValue = {
		url,
		type,
		id,
		opensInNewTab: target === '_blank',
		noFollow: prependRel?.includes('nofollow'),
		sponsored: prependRel?.includes('sponsored'),
	};

	const onChangeLink = useCallback(
		nextValue => {
			// Merge the next value with the current link value.
			nextValue = {
				...linkValue,
				...nextValue,
			};

			const newUrl = prependHTTP(nextValue.url);

			const format = createLinkFormat({
				id: validateLinkId(nextValue.id),
				type: nextValue.type,
				url: newUrl,
				opensInNewWindow: nextValue.opensInNewTab,
				noFollow: nextValue.noFollow,
				sponsored: nextValue.sponsored,
			});

			if (shouldInsertLink(value, isActive)) {
				const newText = getNewText(nextValue, newUrl),
					toInsert = applyFormat(newText, format, 0, newText.length);

				onChange(insert(value, toInsert));
			} else {
				let newValue = applyFormat(value, format);
				newValue.start = newValue.end;
				newValue.activeFormats = [];

				onChange(newValue);
			}

			// Focus should only be shifted back to the formatted segment when the
			// URL is submitted.
			if (!isToggleSetting(linkValue, nextValue)) {
				stopAddingLink();
			}
		},
		[linkValue],
	); // Added a dependency for the update function onChangeLink, this will fix the changes of the wrong link, which is present in Yoast

	const noFollowLabel = createInterpolateElement(
		sprintf(__('Search engines should ignore this link (mark as %1$snofollow%2$s)', 'rgbcode'), '<code>', '</code>'),
		{
			code: <code />,
		},
	);

	const sponsoredLabel = createInterpolateElement(
		sprintf(__('This is a sponsored link or advert (mark as %1$ssponsored%2$s)', 'rgbcode'), '<code>', '</code>'),
		{
			code: <code />,
		},
	);

	// Render UI
	const settings = [
		{
			id: 'opensInNewTab',
			title: __('Open in new tab', 'rgbcode'),
		},
		{
			id: 'noFollow',
			title: noFollowLabel,
		},
		{
			id: 'sponsored',
			title: sponsoredLabel,
		},
	];

	const popoverRef = useRef();
	const uniqueKey = useMemo(uniqueId, [addingLink]);
	const anchor = useMemo(() => anchorRef(addingLink, isActive), [addingLink, value.start, value.end]);

	return (
		<Popover
			ref={popoverRef}
			anchor={anchor}
			focusOnMount={addingLink ? 'firstElement' : false}
			onClose={stopAddingLink}
			onFocusOutside={stopAddingLink}
			position='bottom center'
			placement='bottom'
			shift
		>
			<LinkControl key={uniqueKey} value={linkValue} onChange={onChangeLink} forceIsEditingLink={addingLink} settings={settings} />
		</Popover>
	);
}

export default InlineLinkUI;

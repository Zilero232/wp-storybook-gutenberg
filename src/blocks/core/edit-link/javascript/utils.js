import uniq from 'lodash/uniq';

/**
 * Validates the link id is not null or undefined and cast it to string.
 *
 * @param {string} id The link id.
 * @returns {string} The validated link id.
 */
export const validateLinkId = id => {
	if (typeof id === 'number' || typeof id === 'string') {
		return String(id);
	}
};

/**
 * Generates the format object that will be applied to the link text.
 *
 * @param {Object}  options                  The options object.
 * @param {string}  options.url              The href of the link.
 * @param {boolean} options.opensInNewWindow Whether this link will open in a new window.
 *
 * @returns {Object} The final format object.
 */
export function createLinkFormat({ url, opensInNewWindow, noFollow, sponsored }) {
	const format = {
		type: 'core/link',
		attributes: {
			url,
		},
	};

	let relAttributes = [];

	if (opensInNewWindow) {
		format.attributes.target = '_blank';

		relAttributes.push('noreferrer noopener');
	}

	if (sponsored) {
		relAttributes.push('sponsored');
		relAttributes.push('nofollow');
	}

	if (noFollow) {
		relAttributes.push('nofollow');
	}

	if (relAttributes.length > 0) {
		relAttributes = uniq(relAttributes);
		format.attributes.rel = relAttributes.join(' ');
	}

	return format;
}

/**
 * Generates the format object that will be applied to the link text.
 *
 * @param {boolean}  addingLink                  The options object.
 * @param {boolean}  isActive              The href of the link.
 *
 */
export const anchorRef = (addingLink, isActive) => {
	const selection = window.getSelection();

	if (!selection.rangeCount) {
		return;
	}

	const range = selection.getRangeAt(0);

	if (addingLink && !isActive) {
		return range;
	}

	let element = range.startContainer;

	// If the caret is right before the element, select the next element.
	element = element.nextElementSibling || element;

	while (element.nodeType !== window.Node.ELEMENT_NODE) {
		element = element.parentNode;
	}

	return element.closest('a');
};

import React from 'react';

import get from 'lodash/get';
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { RichTextToolbarButton, RichTextShortcut } from '@wordpress/block-editor';
import { registerFormatType, getTextContent, applyFormat, removeFormat, slice, isCollapsed } from '@wordpress/rich-text';
import { isURL, isEmail } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
// import './editor.scss';

import InlineLinkUI from './inline';

// Other blocks might restrict their richtext to core/link. That's why we need to replace core/link instead of registering our link.
const name = 'core/link',
	title = __('Link', 'rgbcode');

export class LinkEdit extends Component {
	constructor() {
		super(...arguments);

		this.addLink = this.addLink.bind(this);
		this.stopAddingLink = this.stopAddingLink.bind(this);
		this.onRemoveFormat = this.onRemoveFormat.bind(this);
		this.state = {
			addingLink: false,
		};
	}

	addLink() {
		const { value, onChange } = this.props;
		const text = getTextContent(slice(value));

		if (text && isURL(text)) {
			onChange(
				applyFormat(value, {
					id: Math.random().toString(),
					type: name,
					attributes: { url: text },
				}),
			);
		} else if (text && isEmail(text)) {
			onChange(
				applyFormat(value, {
					id: Math.random().toString(),
					type: name,
					attributes: { url: `mailto:${text}` },
				}),
			);
		} else {
			this.setState({ addingLink: true });
		}
	}

	stopAddingLink() {
		this.setState({ addingLink: false, isShow: false });
		this.props.onFocus();
	}

	onRemoveFormat() {
		const { value, onChange } = this.props;
		onChange(removeFormat(value, name));
	}

	render() {
		const { isActive, activeAttributes, value, onChange } = this.props;

		let RichTextToolbarSettings = {};

		if (isActive) {
			RichTextToolbarSettings = {
				icon: 'editor-unlink',
				title: __('Unlink', 'rgbcode'),
				onClick: this.onRemoveFormat,
				shortcutType: 'primaryShift',
			};
		}

		return (
			<>
				{/* <RichTextShortcut type='primary' character='k' onUse={this.addLink} />
				<RichTextShortcut type='primaryShift' character='k' onUse={this.onRemoveFormat} /> */}
				<RichTextToolbarButton
					name='link'
					icon='admin-links'
					title={title}
					onClick={this.addLink}
					shortcutType='primary'
					shortcutCharacter='k'
					isActive={isActive}
					{...RichTextToolbarSettings}
				/>
				{(this.state.addingLink || isActive) && (
					<InlineLinkUI
						addingLink={this.state.addingLink}
						stopAddingLink={this.stopAddingLink}
						isActive={isActive}
						activeAttributes={activeAttributes}
						value={value}
						onChange={onChange}
					/>
				)}
			</>
		);
	}
}

const link = {
	name,
	title,
	tagName: 'a',
	className: null,
	attributes: {
		url: 'href',
		target: 'target',
		rel: 'rel',
	},
	replaces: 'core/link',
	__unstablePasteRule(value, { html, plainText }) {
		if (isCollapsed(value)) {
			return value;
		}

		const pastedText = (html || plainText).replace(/<[^>]+>/g, '').trim();

		// A URL was pasted, turn the selection into a link
		if (!isURL(pastedText)) {
			return value;
		}

		// Allows us to ask for this information when we get a report.
		window.console.log('Created link:\n\n', pastedText);

		return applyFormat(value, {
			type: name,
			attributes: {
				url: decodeEntities(pastedText),
			},
		});
	},
	edit: LinkEdit,
};

if (typeof get(window, 'wp.blockEditor.__experimentalLinkControl') === 'function') {
	const { name, replaces, ...settings } = link;
	if (replaces) {
		dispatch('core/rich-text').removeFormatTypes(replaces);
	}
	if (name) {
		registerFormatType(name, settings);
	}
}

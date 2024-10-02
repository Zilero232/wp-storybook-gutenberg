/**
 * React dependencies
 */
import React, { useLayoutEffect } from 'react';

/**
 * External dependencies
 */
import { Decorator } from '@storybook/react';

/**
 * Internal dependencies
 */
import CONFIG, { Style } from '@st/public/styles/config';
import GlobalWordpressStyle from '@st/public/styles/global-wordpress.lazy.scss';

export const withStyles: Decorator = (Story, context) => {
	const canvasElement = context.canvasElement;

	useLayoutEffect(() => {
		const stylesToUse: Style[] = [GlobalWordpressStyle];

		const elementsClasses = new Set(
			[...canvasElement.getElementsByTagName('*')]
				.filter(el => el.className)
				.map(el => el.className),
		);

		if (!elementsClasses) {
			return;
		}

		CONFIG.forEach(item => {
			elementsClasses.forEach(_class => {
				if (item.componentIdMatcher.test(_class)) {
					stylesToUse.push(item.style);
				}
			});
		});

		stylesToUse.forEach(style => style.use());

		return () => {
			stylesToUse.forEach(style => style.unuse());
		};
	}, [canvasElement]);

	return <Story {...context} />;
};

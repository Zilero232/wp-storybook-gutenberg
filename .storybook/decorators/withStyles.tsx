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
import CONFIG, { Style } from '../public/styles/config';

export const withStyles: Decorator = (Story, context) => {
	useLayoutEffect(() => {
		const stylesToUse: Style[] = [];

		CONFIG.forEach(item => {
			if (item.componentIdMatcher.test(context.componentId)) {
				item.styles.map(style => stylesToUse.push(style));
			}
		});

		stylesToUse.forEach(style => style.use());

		return () => {
			stylesToUse.forEach(style => style.unuse());
		};
	}, [context.componentId]);

	return <Story {...context} />;
};

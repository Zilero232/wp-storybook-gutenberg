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
import CONFIG, { Style } from '../styles/config';

export const useStyles: Decorator = (Story, context) => {
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

	return (
		<div>
			<Story {...context} />
		</div>
	);
};

/**
 * React dependencies
 */
import React, { ReactNode } from 'react';

/**
 * Internal dependencies
 */
import { IconProps } from '../types';
import { PathElement } from './pathElement';

export const RenderPathElements = (props: IconProps['props']): ReactNode => {
	if (Array.isArray(props?.children)) {
		return props.children.map((path, index) => (
			<PathElement
				key={index}
				clipRule={path?.props?.clipRule}
				fillRule={path?.props?.fillRule}
				d={path?.props?.d}
			/>
		));
	}

	if (props?.children) {
		return (
			<PathElement
				clipRule={props.children?.props?.clipRule}
				fillRule={props.children?.props?.fillRule}
				d={props.children?.props?.d}
			/>
		);
	}

	return null;
};

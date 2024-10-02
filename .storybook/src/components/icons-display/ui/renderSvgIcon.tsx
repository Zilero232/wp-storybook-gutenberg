/**
 * React dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { IconProps } from '../types';
import { RenderPathElements } from './renderPathElements';

const sizesIcons = [20, 30, 35];

export const RenderSvgIcon = ({ icon }: { icon: unknown }) => {
	const { props } = icon as IconProps;

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gridGap: 10,
			}}
		>
			{sizesIcons.map(size => (
				<svg
					key={size}
					xmlns={props?.xmlns}
					width={size}
					height={size}
					viewBox={props?.viewBox}
				>
					{RenderPathElements(props)}
				</svg>
			))}
		</div>
	);
};

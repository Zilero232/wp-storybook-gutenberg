/*
 * React dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { PathElementProps } from '../types';

export const PathElement = ({ clipRule, fillRule, d }: PathElementProps) => {
	return <path clipRule={clipRule} fillRule={fillRule} d={d} />;
};

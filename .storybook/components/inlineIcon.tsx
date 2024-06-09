/**
 * React dependencies
 */
import React, { ComponentProps } from 'react';

/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { Icons } from '@storybook/components';

const StyledIcons = styled(Icons)`
	display: inline-block !important;
	width: 14px;
`;

interface InlineIconProps extends ComponentProps<typeof Icons> {}

export const InlineIcon = (props: InlineIconProps) => <StyledIcons aria-hidden {...props} />;

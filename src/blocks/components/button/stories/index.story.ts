/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import Button from '../edit';

const meta = {
	title: 'Components/Button',
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		label: 'Button',
	},
} satisfies Story;

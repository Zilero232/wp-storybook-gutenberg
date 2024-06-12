/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import Toolbar from '../edit';

const meta = {
	title: 'Components/Toolbar',
	component: Toolbar,
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		label: 'Toolbar',
	},
} satisfies Story;

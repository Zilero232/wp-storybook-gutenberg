/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import Select from '../edit';

const meta = {
	title: 'Custom/SelectDrag',
	component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

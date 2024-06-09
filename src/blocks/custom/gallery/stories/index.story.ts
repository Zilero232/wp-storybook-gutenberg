/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Edit as Gallery } from '../typescript/edit';

const meta = {
	title: 'Custom/Gallery',
	component: Gallery,
} satisfies Meta<typeof Gallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

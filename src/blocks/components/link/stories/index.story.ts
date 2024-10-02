/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import CustomLink from './template';

const meta = {
	title: 'Custom/Custom Link',
	component: CustomLink,
} satisfies Meta<typeof CustomLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Edit as Banner } from '../typescript/edit';

const meta = {
	title: 'Custom/ParalaxBanner',
	component: Banner,
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

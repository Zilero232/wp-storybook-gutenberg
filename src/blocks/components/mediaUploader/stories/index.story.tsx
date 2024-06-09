/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import MediaUploader from '../typescript/edit';

const meta = {
	title: 'Components/MediaUploader',
	component: MediaUploader,
} satisfies Meta<typeof MediaUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		label: 'Button',
	},
} satisfies Story;

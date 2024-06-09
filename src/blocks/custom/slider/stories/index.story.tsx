/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Edit as IframePlay } from '../typescript/edit';

const meta = {
	title: 'Custom/Slider',
	component: IframePlay,
} satisfies Meta<typeof IframePlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

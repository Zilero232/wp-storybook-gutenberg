import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { LinkEdit } from '../javascript/index';

const meta = {
	title: 'Core/EditLink',
	component: LinkEdit,
} satisfies Meta<typeof LinkEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

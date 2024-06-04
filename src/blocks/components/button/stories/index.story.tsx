/**
 * React dependencies
 */

/**
 * External dependencies
 */
import { Story } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import Button from '../typescript/edit';

const meta = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		controls: { expanded: true },
		preview: [
			{
				tab: 'Vanilla',
				template: Button,
				language: 'tsx',
				copy: true,
			},
		],
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		label: 'Button',
	},
} satisfies Story;

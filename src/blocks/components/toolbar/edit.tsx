/**
 * React dependency
 */
import React, { ReactElement } from 'react';

/**
 * WordPress dependencies
 */
import { DropdownMenu, Toolbar as GToolbar, ToolbarButton, ToolbarDropdownMenu, ToolbarGroup, ToolbarItem } from '@wordpress/components';
import {
	alignCenter,
	alignLeft,
	alignRight,
	arrowDown,
	arrowLeft,
	arrowRight,
	arrowUp,
	chevronDown,
	formatBold,
	formatItalic,
	link,
	more,
	paragraph,
} from '@wordpress/icons';

/** Primary UI component */
const Toolbar = (): ReactElement => {
	return (
		<GToolbar label='Options'>
			<>
				<ToolbarGroup>
					<ToolbarButton icon={paragraph} text='Paragraph' />
				</ToolbarGroup>

				<ToolbarGroup>
					<ToolbarItem>
						{toggleProps => (
							<DropdownMenu
								icon={alignLeft}
								label='Align'
								controls={[
									{
										icon: alignLeft,
										title: 'Align left',
										isActive: true,
									},
									{
										icon: alignCenter,
										title: 'Align center',
									},
									{
										icon: alignRight,
										title: 'Align right',
									},
								]}
								toggleProps={toggleProps}
							/>
						)}
					</ToolbarItem>
				</ToolbarGroup>

				<ToolbarGroup>
					<ToolbarButton>Text</ToolbarButton>
					<ToolbarButton icon={formatBold} label='Bold' isPressed />
					<ToolbarButton icon={formatItalic} label='Italic' />
					<ToolbarButton icon={link} label='Link' />
				</ToolbarGroup>

				<ToolbarGroup
					icon={more}
					title='Align'
					isCollapsed
					controls={[
						{
							icon: alignLeft,
							title: 'Align left',
							isActive: true,
						},
						{ icon: alignCenter, title: 'Align center' },
						{ icon: alignRight, title: 'Align right' },
					]}
				/>

				<ToolbarDropdownMenu
					icon={chevronDown}
					label='Select a direction'
					controls={[
						{
							title: 'Up',
							icon: arrowUp,
						},
						{
							title: 'Right',
							icon: arrowRight,
						},
						{
							title: 'Down',
							icon: arrowDown,
						},
						{
							title: 'Left',
							icon: arrowLeft,
						},
					]}
				/>
			</>
		</GToolbar>
	);
};

export default Toolbar;

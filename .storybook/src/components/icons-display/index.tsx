/**
 * React dependencies
 */
import React, { useState } from 'react';

/**
 * Wordpress dependencies
 */
import * as Icons from '@wordpress/icons';

/**
 * Internal dependencies
 */

import { ToastContainer } from '@st/src/components/toastContainer';
import { useCopyToClipboard } from '@st/src/hooks/useCopyToClipboard';
import { RenderSvgIcon } from './ui//renderSvgIcon';

const allIcons = Object.entries(Icons);

export const IconsDisplay = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isCopied, copyToClipboard] = useCopyToClipboard();

	const filteredIcons = allIcons.filter(([name]) =>
		name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleIconClick = (name: string) => {
		const svgTemplate = `<Icon icon={${name}} />`;

		copyToClipboard({
			text: svgTemplate,
			message: 'Icon copied to the clipboard!',
		});
	};

	return (
		<>
			<ToastContainer />

			<div style={{ fontFamily: 'Arial, sans-serif' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '1rem',
					}}
				>
					<input
						type='text'
						placeholder='Quickly search icons'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						style={{
							width: '100%',
							padding: '0.5rem',
							fontSize: '1rem',
							borderRadius: '5px',
							border: '1px solid #ccc',
						}}
					/>
				</div>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(5, 1fr)',
						gap: '1rem',
					}}
				>
					{filteredIcons.map(([name, icon]: [name: string, icon: any]) => {
						if (
							typeof icon.$$typeof === 'symbol' &&
							icon.$$typeof.toString() === 'Symbol(react.element)'
						) {
							return (
								<div key={name} style={{ textAlign: 'center' }}>
									<div
										style={{
											border: '1px solid #ccc',
											borderRadius: '5px',
											padding: '1rem',
											boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
											cursor: 'pointer',
										}}
										onClick={() => handleIconClick(name)}
									>
										<div style={{ marginBottom: '0.5rem' }}>
											{RenderSvgIcon({ icon })}
										</div>
										<div style={{ fontSize: '0.9rem' }}>{name}</div>
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
		</>
	);
};

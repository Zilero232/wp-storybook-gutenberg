/**
 * React dependency
 */
import React from 'react';

/**
 * External dependencies
 */
import { Form } from '@storybook/components';

/**
 * Internal dependencies
 */
import { useStateContext } from '../../hooks/useStateContext';

export const Select = () => {
	const { files, selectedFileName, setSelectedFileName } = useStateContext();

	return (
		<Form>
			<Form.Select
				value={selectedFileName}
				style={{ width: '100%', marginTop: '0.5em', fontSize: '15px' }}
				onChange={e => setSelectedFileName(e.target.value)}
			>
				<option>Not selected</option>
				{files?.map(({ fileName }) => (
					<option key={fileName} value={fileName}>
						{fileName}
					</option>
				))}
			</Form.Select>
		</Form>
	);
};

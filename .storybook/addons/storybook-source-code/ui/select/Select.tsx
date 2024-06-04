/**
 * React dependency
 */
import React from 'react';

/**
 * External dependencies
 */
import ReactSelect, { SingleValue } from 'react-select';

// Define the option type for react-select.
interface OptionType {
	value: string;
	label: string;
}

interface Props {
	selected: string;
	files: any;
	handleChange: any;
}

const styles = {
	option: (baseStyles, state) => ({
		...baseStyles,
		color: state.isSelected ? 'white' : 'black',
	}),
};

const handleFileChange = (option: SingleValue<OptionType>, handleChange: any) => {
	handleChange(option ? option.value : '');
};

export const Select = ({ selected, files, handleChange }: Props) => {
	return (
		<ReactSelect<OptionType>
			value={selected ? { value: selected, label: selected } : null}
			onChange={option => handleFileChange(option, handleChange)}
			options={files?.map(item => ({
				value: item.fileName,
				label: item.fileName,
			}))}
			styles={styles}
		/>
	);
};

export interface OptionType {
	label: string;
	value: string;
}

export interface MultiSelectDragProps {
	isDisabled?: boolean;
	isLoading?: boolean;
	isOptionDisabled?: (option: OptionType) => boolean;
	placeholder?: string;
}

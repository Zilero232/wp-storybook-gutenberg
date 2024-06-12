/**
 * React dependencies
 */
import React, { useState } from 'react';

/**
 * External dependencies
 */
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Select, { components, MultiValueProps, StylesConfig } from 'react-select';

/**
 * Internal dependencies
 */
import { MultiSelectDragProps, OptionType } from './types';

const customStyles: StylesConfig<OptionType, true> = {
	multiValue: provided => ({
		...provided,
		justifyContent: 'space-between',
	}),
	multiValueLabel: provided => ({
		...provided,
		padding: '6px',
	}),
	valueContainer: provided => ({
		...provided,
		padding: '2px 0 2px 8px',
		gap: '3px',
	}),
	option: (provided, state) => ({
		...provided,
		opacity: state.isDisabled ? '0.4' : '1',
	}),
	button: provided => ({
		...provided,
		width: '100%',
	}),
};

const options: OptionType[] = [
	{
		label: 'Option1',
		value: 'Option1',
	},
	{
		label: 'Option2',
		value: 'Option2',
	},
];

const SortableMultiValueLabel: MultiValueProps<OptionType> = props => {
	const { attributes, listeners } = useSortable({ id: props.data.value });

	return (
		<div style={{ width: '100%' }} {...attributes} {...listeners}>
			<components.MultiValueLabel {...props} />
		</div>
	);
};

const SortableMultiValue: MultiValueProps<OptionType> = props => {
	const { setNodeRef, transform, transition } = useSortable({
		id: props.data.value,
	});

	const style = {
		width: '40%',
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style}>
			<components.MultiValue {...props} />
		</div>
	);
};

const MultiSelectDrag = ({
	isDisabled = false,
	isLoading = false,
	isOptionDisabled = () => false,
	placeholder = 'Select...',
}: MultiSelectDragProps) => {
	const [selected, setSelected] = useState<OptionType[]>([]);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			const oldIndex = selected.findIndex(i => i.value === active.id);
			const newIndex = over ? selected.findIndex(i => i.value === over.id) : selected.length - 1;

			setSelected(arrayMove(selected, oldIndex, newIndex));
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={selected.map(s => s.value)} strategy={verticalListSortingStrategy}>
				<Select
					isMulti
					placeholder={placeholder}
					options={options}
					value={selected}
					onChange={selectedOptions => setSelected(selectedOptions as OptionType[])}
					components={{
						MultiValue: SortableMultiValue,
						MultiValueLabel: SortableMultiValueLabel,
					}}
					theme={theme => ({
						...theme,
						borderRadius: 0,
						colors: {
							...theme.colors,
							primary: '#9ec5fe',
							neutral20: '#1d1d1d',
							neutral30: '#0d6efd',
						},
					})}
					styles={{
						...customStyles,
					}}
					isLoading={isLoading}
					isDisabled={isDisabled}
					isOptionDisabled={isOptionDisabled}
					closeMenuOnSelect={false}
				/>
			</SortableContext>
		</DndContext>
	);
};

export default MultiSelectDrag;

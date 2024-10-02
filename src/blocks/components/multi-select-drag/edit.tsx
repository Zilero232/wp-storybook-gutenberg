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
import Select, { components } from 'react-select';

/**
 * Internal dependencies
 */
import { CustomStyles, Option, SelectProps, SortableMultiValueLabelProps, SortableMultiValueProps } from './types';

const customStyles: CustomStyles = {
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
};

const options: Option[] = Array.from({ length: 10 }, (_, index) => ({
	label: `option-${index}`,
	value: `option-${index}`,
}));

const SortableMultiValueLabel = (props: SortableMultiValueLabelProps) => {
	const { attributes, listeners } = useSortable({ id: props.data.value });

	return (
		<div style={{ width: '100%' }} {...attributes} {...listeners}>
			<components.MultiValueLabel {...props} />
		</div>
	);
};

const SortableMultiValue = (props: SortableMultiValueProps) => {
	const { setNodeRef, transform, transition } = useSortable({
		id: props.data.value,
	});

	const style = {
		display: 'flex',
		alignItems: 'center',
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style}>
			<components.MultiValue {...props} />
		</div>
	);
};

const MultiSelectDrag = ({ ...props }: SelectProps) => {
	const [selected, setSelected] = useState<Option[]>(options);

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
					options={options}
					value={selected}
					onChange={selectedOptions => setSelected(selectedOptions as Option[])}
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
					{...props}
				/>
			</SortableContext>
		</DndContext>
	);
};

export default MultiSelectDrag;

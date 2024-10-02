/**
 * External dependencies.
 */
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { verticalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable';

/**
 * Internal dependencies.
 */
import SortableItem from './components/SortableItem';

const Sortable = ({ items, handleDragEnd, handleChangeCardField, handleRemoveCard }) => {
	const sensors = useSensors(useSensor(PointerSensor));

	const onDragEnd = ({ active, over }) => {
		if (active.id !== over?.id) {
			const cardsList = [...items];

			const oldIndex = cardsList.findIndex(item => item.id === active.id);
			const newIndex = cardsList.findIndex(item => item.id === over.id);

			if (oldIndex !== -1 && newIndex !== -1) {
				handleDragEnd(arrayMove(cardsList, oldIndex, newIndex));
			}
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
			<SortableContext items={items.map(s => s.id)} strategy={verticalListSortingStrategy}>
				{items.map((item, idx) => (
					<SortableItem
						key={item.id}
						idx={idx}
						{...item}
						handleChangeCardField={(field, value) => handleChangeCardField(field, value, item.id)}
						handleRemoveCard={handleRemoveCard}
					/>
				))}
			</SortableContext>
		</DndContext>
	);
};

export default Sortable;

/**
 * React dependencies.
 */
import React from 'react';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import BlockControlsComponent from './components/BlockControls';
import BlockContent from './components/BlockContent';

const Edit = ({ attributes, setAttributes }) => {
	// Update сards.
	const updateCards = (id, updateFunction) => {
		let cardsList = [...items];

		if (id) {
			// Find the index of the element with the given id.
			const index = cardsList.findIndex(item => item.id === id);

			if (index !== -1) {
				cardsList = updateFunction(cardsList, index);
			}
		} else {
			cardsList = updateFunction(cardsList);
		}

		setAttributes({
			items: cardsList,
		});
	};

	// Add card.
	const addCard = () => {
		updateCards(null, cardsList => [
			...cardsList,
			{
				id: randomKey(),
				linkData: {
					id: 0,
					url: '',
				},
				cardImage: 0,
				cardImageURL: '',
				cardTitle: '',
				cardBtnText: '',
			},
		]);
	};

	// Change field on card.
	const changeCardField = (fields, value, id) => {
		updateCards(id, (cardsList, index) => {
			let updatedCard = { ...cardsList[index] }; // Copy the current card.

			// Merge only provided fields in the object.
			if (typeof fields === 'object') {
				updatedCard = {
					...updatedCard,
					...fields,
				};
			}
			// Handle single field update if fields is not an object.
			else {
				updatedCard = {
					...updatedCard,
					[fields]: value,
				};
			}

			return [...cardsList.slice(0, index), updatedCard, ...cardsList.slice(index + 1)];
		});
	};

	// Delete card.
	const removeCard = id => {
		updateCards(id, (cardsList, index) => cardsList.filter((_, i) => i !== index));
	};

	// Move card.
	const onDragEnd = cardsList => {
		setAttributes({ items: cardsList });
	};

	return (
		<>
			<BlockControlsComponent attributes={attributes} setAttributes={setAttributes} />

			<BlockContent attributes={attributes} />
		</>
	);
};

export default Edit;

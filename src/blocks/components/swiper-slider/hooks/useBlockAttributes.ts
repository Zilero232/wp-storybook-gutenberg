import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from 'react';

export const useBlockAttributes = (blockId: string) => {
	const attributes = useSelect(select => select('core/block-editor').getBlockAttributes(blockId));
	const { updateBlockAttributes } = useDispatch('core/block-editor');

	useEffect(() => {
		// Вызов логики при изменении атрибутов
	}, [attributes]);

	const setAttributes = (newAttributes: any) => {
		updateBlockAttributes(blockId, newAttributes);
	};

	return { attributes, setAttributes };
};

/**
 * React dependency
 */
import { useContext } from 'react';

/**
 * Internal dependencies
 */
import { StateContext } from '../providers/stateContext';
import { StateContextProps } from '../types';

export const useStateContext = (): StateContextProps => {
	const context = useContext(StateContext);

	if (!context) {
		throw new Error('useStateContext must be used within a StateProvider');
	}

	return context;
};

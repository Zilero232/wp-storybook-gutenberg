/**
 * Stylesheets to lazy load when the story's context.componentId matches the
 * componentIdMatcher regex.
 *
 * To prevent problematically overscoped styles in a package stylesheet
 * from leaking into stories for other packages, we should explicitly declare
 * stylesheet dependencies for each story group.
 */

/**
 * Internal dependencies
 */
// @ts-ignore
import global from './global.lazy.scss';
// @ts-ignore
import components from './components.lazy.scss';

export type Style = {
	use: () => void;
	unuse: () => void;
};

export interface StyleItem {
	componentIdMatcher: RegExp;
	styles: Style[];
}

const CONFIG: StyleItem[] = [
	{
		componentIdMatcher: /^components-/,
		styles: [global, components],
	},
];

export default CONFIG;

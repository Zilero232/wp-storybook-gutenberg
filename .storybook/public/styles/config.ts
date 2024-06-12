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

// @ts-ignore-start
import blockEditor from './block-editor.lazy.scss';
import blockLibrary from './block-library.lazy.scss';
import components from './components.lazy.scss';
// @ts-ignore-end

export type Style = {
	use: () => void;
	unuse: () => void;
};

export interface StyleItem {
	componentIdMatcher: RegExp;
	style: Style;
}

const CONFIG: StyleItem[] = [
	{
		componentIdMatcher: /^playground-/,
		style: blockLibrary,
	},
	{
		componentIdMatcher: /^components-/,
		style: components,
	},
	{
		componentIdMatcher: /^block-editor-/,
		style: blockEditor,
	},
];

export default CONFIG;

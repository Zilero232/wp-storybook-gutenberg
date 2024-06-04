/**
 * React dependency
 */
import React, { Suspense, useEffect } from 'react';

/**
 * External dependencies
 */
import { Decorator } from '@storybook/react';

import { I18nextProvider } from 'react-i18next';

/**
 * Internal dependencies
 */
import i18n from './i18n';

// Wrap your stories in the I18nextProvider component
export const withI18n: Decorator = (Story, context) => {
	const { locale } = context.globals;

	// When the locale global changes
	useEffect(() => {
		// Set the new locale in i18n
		i18n.changeLanguage(locale);
		// set the document direction
		document.dir = i18n.dir(locale);
	}, [locale]);

	// This catches the suspense from components not yet ready (still loading translations)
	// Alternative: set useSuspense to false on i18next.options.react when initializing i18next
	return (
		<Suspense fallback={<div>loading translations...</div>}>
			<I18nextProvider i18n={i18n}>
				<Story />
			</I18nextProvider>
		</Suspense>
	);
};

// export decorators for storybook to wrap your stories in
export const decorators = [withI18n];

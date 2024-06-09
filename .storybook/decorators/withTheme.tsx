import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './themes';

export const withThemeProvider = (Story: any, context: any) => {
	const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme;

	useEffect(() => {
		document.body.className = context.globals.theme === 'dark' ? 'dark' : 'light';
	}, [context.globals.theme]);

	return (
		<ThemeProvider theme={theme}>
			<Story {...context} />
		</ThemeProvider>
	);
};

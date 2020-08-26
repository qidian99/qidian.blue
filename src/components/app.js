import { h, Component, createContext } from 'preact';
import { useReducer, useState, useEffect } from 'preact/hooks'
import { Router } from 'preact-router';
import { I18nextProvider } from 'react-i18next';
import { zhCN } from '@material-ui/core/locale';
import { BrowserRouter, Route } from 'react-router-dom';
import * as views from '../views';
import * as locales from '@material-ui/core/locale';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CSSTransition } from 'react-transition-group'

import { AppLayout } from '../router/layout';
import { LocalizedRouter, LocalizedSwitch, appStrings, LanguageSwitcher } from '../router/i18n';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { AppRoute, AppLanguage } from '../router/const';

import Scroller from '../components/Scroller';
import { initialState, reducer, defaultLanguage } from '../store/reducer'
import { MyContext } from '../store/context'
import '../router/i18n/localizations'

import i18next from 'i18next';
import common_enUS from '../translations/en-US/common.json';
import common_zhCN from '../translations/zh-CN/common.json';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import "animation.gsap";
// import "debug.addIndicators";

i18next.init({
	interpolation: { escapeValue: false },  // React already does escaping
	lng: defaultLanguage,                            // language to use
	resources: {
		enUS: {
			common: common_enUS                 // 'common' is our custom namespace
		},
		zhCN: {
			common: common_zhCN
		}
	}
});

const DARK_THEME = {
	palette: {
		primary: { main: '#2B2741' },
		secondary: {
			main: '#8FEBD5',
		},
		type: 'dark',
	},
};


const LIGHT_THEME = {
	palette: {
		type: 'light',
	},
	// palette: {
	// 	text: {
	// 		primary: "#fff",
	// 		secondary: "#000"
	// 	},
	// },
};
const App = () => {

	const [store, dispatch] = useReducer(reducer, initialState);

	// const [theme, setTheme] = useState(createMuiTheme(DARK_THEME));

	// console.log(store.theme, store.language)
	// useEffect(() => {
	// 	setTheme({
	// 		...DARK_THEME,
	// 		palette: {
	// 			...DARK_THEME.palette,
	// 			type: store.theme
	// 		}
	// 	})
	// }, [store.theme])

	// console.log(store.language, locales[store.language])

	return (
		<div>
			<MyContext.Provider value={{ store, dispatch }}>
				<ThemeProvider theme={createMuiTheme(store.theme === 'dark' ? DARK_THEME : LIGHT_THEME, locales[store.language])}>
					<I18nextProvider i18n={i18next}>
						<LocalizedRouter
							RouterComponent={BrowserRouter}
							languages={AppLanguage}
						>
							<AppLayout>
								<LocalizedSwitch>
									<Route exact path={AppRoute.Home}>
										<views.Home />
									</Route>
									<Route exact path={AppRoute.Projects}>
										<views.Projects />
									</Route>
									<Route exact path={AppRoute.Resume}>
										<views.Resume />
									</Route>
									<Route path="*">
										<views.GeneralError />
									</Route>
								</LocalizedSwitch>
							</AppLayout>
						</LocalizedRouter>
					</I18nextProvider>
				</ThemeProvider>
			</MyContext.Provider>
		</div>
	);
}

export default App;

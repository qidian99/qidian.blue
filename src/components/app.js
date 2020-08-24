import { h, Component, createContext } from 'preact';
import { useReducer } from 'preact/hooks'
import { Router } from 'preact-router';
import { I18nextProvider } from 'react-i18next';
import { zhCN } from '@material-ui/core/locale';
import { BrowserRouter, Route } from 'react-router-dom';
import * as views from '../views';
import * as locales from '@material-ui/core/locale';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AppLayout } from '../router/layout';
import { LocalizedRouter, LocalizedSwitch, appStrings, LanguageSwitcher } from '../router/i18n';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { AppRoute, AppLanguage } from '../router/const';

import Scroller from '../components/Scroller';
import UserList, { AddGenderToUser } from '../components/UserList'
import { initialState, reducer, defaultLanguage } from '../store/reducer'
import { MyContext } from '../store/context'
import '../router/i18n/localizations'

const theme = createMuiTheme({
	palette: {
		primary: { main: '#2B2741' },
		secondary: {
			main: '#8FEBD5',
		},
	},
});

import i18next from 'i18next';
import common_enUS from '../translations/en-US/common.json';
import common_zhCN from '../translations/zh-CN/common.json';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

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

export default class App extends Component {

	render() {

		const [store, dispatch] = useReducer(reducer, initialState);
		console.log(store.language)

		// console.log(store.language, locales[store.language])

		return (
			<div id="app">
				<MyContext.Provider value={{ store, dispatch }}>
					<ThemeProvider theme={createMuiTheme(theme, locales[store.language])}>
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
}

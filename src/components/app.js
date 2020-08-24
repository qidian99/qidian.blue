import { h, Component, createContext } from 'preact';
import { useReducer } from 'preact/hooks'
import { Router } from 'preact-router';
import { I18nextProvider } from 'react-i18next';
import { zhCN } from '@material-ui/core/locale';
import { BrowserRouter, Route } from 'react-router-dom';
import * as views from 'views';
import * as locales from '@material-ui/core/locale';
import TablePagination from '@material-ui/core/TablePagination';

import { AppLayout } from 'modules/layout';
import { LocalizedRouter, LocalizedSwitch, appStrings } from 'modules/i18n';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { AppRoute, AppLanguage } from 'const';

import Scroller from '../components/Scroller';
import UserList, { AddGenderToUser } from '../components/UserList'
import { initialState, reducer } from '../store/reducer'
import { MyContext } from '../store/context'

const theme = createMuiTheme({
	palette: {
		primary: { main: '#2B2741' },
		secondary: {
			main: '#8FEBD5',
		},
	},
});


import { HeaderComponent } from '../components/LanguageSwitch'
import i18next from 'i18next';
import common_enUS from '../translations/en-US/common.json';
import common_zhCN from '../translations/zh-CN/common.json';

import AppBar from '../components/AppBar'

i18next.init({
	interpolation: { escapeValue: false },  // React already does escaping
	lng: 'enUS',                            // language to use
	resources: {
		enUS: {
			common: common_enUS                 // 'common' is our custom namespace
		},
		zhCN: {
			common: common_zhCN
		}
	}
});


// import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFound from '../routes/404';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
export default class App extends Component {

	render() {

		const [store, dispatch] = useReducer(reducer, initialState);

console.log(store.language, locales[store.language])
		return (
			<div id="app">
				<MyContext.Provider value={{ store, dispatch }}>
					<ThemeProvider theme={createMuiTheme(theme, locales[store.language])}>
						<I18nextProvider i18n={i18next}>
							<AppBar />
							<HeaderComponent />
							<UserList />
							{store.language}
							{store.username && <AddGenderToUser />}
							<TablePagination
								count={2000}
								rowsPerPage={10}
								page={1}
								component="div"
								onChangePage={() => { }}
							/>
							{/* <Router onChange={this.handleRoute}>
								<Home path="/" />
								<Profile path="/profile/" user="me" />
								<Profile path="/profile/:user" />
								<NotFound default />
							</Router> */}
							<LocalizedRouter
								RouterComponent={BrowserRouter}
								languages={AppLanguage}
								appStrings={appStrings}
							>
								<AppLayout>
									<LocalizedSwitch>
										<Route exact path={AppRoute.Home}>
											<views.Home />
										</Route>
										<Route exact path={AppRoute.Summary}>
											<views.Summary />
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

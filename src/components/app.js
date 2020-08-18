import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { I18nextProvider } from 'react-i18next';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';



const theme = createMuiTheme({
	palette: {
		// primary: { main: '#1976d2' },
	},
}, zhCN);



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
// import Home from '../routes/home';
// import Profile from '../routes/profile';
import NotFound from '../routes/404';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({
			currentUrl: e.url
		});
	};

	render() {

		return (
			<div id="app">
				<ThemeProvider theme={theme}>
					<I18nextProvider i18n={i18next}>
						<AppBar />
						<HeaderComponent />
						{/* <Router onChange={this.handleRoute}>
						<Home path="/" />
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
						<NotFound default />
					</Router> */}
					</I18nextProvider>
				</ThemeProvider>
			</div>
		);
	}
}

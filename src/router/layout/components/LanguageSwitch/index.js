
import { useContext } from 'preact/hooks'
import { useTranslation } from 'react-i18next';
import { MyContext } from '../../store/context'
import { SET_LANGUAGE } from '../../store/actions'


export function HeaderComponent() {
	const [t, i18n] = useTranslation('common');
	const { store, dispatch } = useContext(MyContext)
	return (<div>
		<h1>{t('welcome.title', { framework: 'Preact' })}</h1>
		<button onClick={() => {
			i18n.changeLanguage('enUS')
			dispatch({ type: SET_LANGUAGE, language: 'enUS' })
		}}>English</button>
		<button onClick={() => {
			i18n.changeLanguage('zhCN');
			dispatch({ type: SET_LANGUAGE, language: 'zhCN'})
		}}>中文</button>
	</div>);
}


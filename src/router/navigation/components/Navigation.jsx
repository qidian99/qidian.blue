import { NavLink } from 'react-router-dom';
import { AppRoute, AppRouteTitles } from "../../const";
import { useContext } from "preact/hooks";
import { MyContext } from "../../../store/context";
import { css } from 'aphrodite/no-important';
import { list, link } from '../../theme';
import { getLocalization } from '../../../utils';
import { useTranslation } from 'react-i18next';

export const Navigation = () => {
  const [t] = useTranslation('common');
  const { store: { language } } = useContext(MyContext)
  const locale = getLocalization(language);

  return (
    <ul className={css(list.container)}>
      {Object.keys(AppRoute).map((elem) => (
        <li key={elem} className={css(list.item)}>
          <NavLink
            exact
            className={css(link.primary)}
            activeClassName={css(link.active)}
            to={localizeRouteKey(AppRoute[elem])}
          >
            {t(AppRouteTitles.get(AppRoute[elem]) || "")}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  function localizeRouteKey(path) {
    return `/${locale}` + t(path);
  }
};

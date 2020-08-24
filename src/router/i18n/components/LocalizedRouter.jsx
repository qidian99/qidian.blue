import React from "react";
import { IntlProvider } from "react-intl";
import { Route, Redirect } from "react-router-dom";
import { AppLanguage } from "../../const";
import { useTranslation } from "react-i18next";
import { useContext } from "preact/hooks";
import { MyContext } from "../../../store/context";
import { LanguageStrings } from "../localizations";
import { getLocalization } from "../../../utils";
import { SET_LANGUAGE } from "../../../store/actions";
import { initialState, defaultLanguage as reducerDefaultLanguage } from "../../../store/reducer";

export const LocalizedRouter = ({
  children,
  RouterComponent,
  defaultLanguage,
}) => {
  const { store, dispatch } = useContext(MyContext);
	const [t, i18n] = useTranslation("common");

  return (
    <RouterComponent>
      <Route path="/:lang([a-z]{2})">
        {({ match, location }) => {
          /**
           * Get current language
           * Set default locale to en if base path is used without a language
           */
          const params = match ? match.params : {};
          const { lang = defaultLanguage || reducerDefaultLanguage.substring(0, 2) } = params;

          // Get the two character localization from path and set the language in global reducer
          const locale = getLocalization(lang);
          if (store.language != locale) {
            store.language = locale;
            // dispatch({
            //   type: SET_LANGUAGE,
            //   language: locale,
            // });
      			i18n.changeLanguage(locale);
          }

          // console.log("locale", locale);

          /**
           * If language is not in route path, redirect to language root
           */
          const { pathname } = location;
          if (!pathname.includes(`/${lang}/`)) {
            return <Redirect to={`/${lang}/`} />;
          }

          /**
           * Return Intl provider with default language set
           */
          return children;
        }}
      </Route>
    </RouterComponent>
  );
};

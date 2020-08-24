import React from "react";
import { AppLanguage } from "../../const";
import { NavLink, useLocation } from "react-router-dom";
// import { useIntl } from 'react-intl';
import { list, link } from "theme";
import { useTranslation } from "react-i18next";
import { useContext } from "preact/hooks";
import { MyContext } from "../../../store/context";

import { routeMap as routeMapDefault } from "..";
const routeMap = routeMapDefault.default;
import { getLocaleAbbrev } from "../../../utils";

export const LanguageSwitcher = () => {
  const { store } = useContext(MyContext);
  const [t] = useTranslation("common");
  const locale = store.language;
  const { pathname } = useLocation();

  return (
    <ul>
      {Object.keys(AppLanguage).map((lang) => (
        <li key={lang}>
          <NavLink to={getMatchingRoute(AppLanguage[lang])}>
            {AppLanguage[lang]}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  function getMatchingRoute(language) {
    /**
     * Get the key of the route the user is currently on
     */
    const lang = getLocaleAbbrev(locale);
    const [_, route] = pathname.split(lang);
    // console.log(
    //   routeMap,
    //   locale,
    //   routeMap[locale],
    //   language,
    //   routeMap[language]
    // );
    // console.log("getMatchingRoute", route);
    // console.log("routeKey", routeKey, Object.keys(routeMap[locale]), route);

    const routeKey = Object.keys(routeMap[locale]).find(
      (key) => routeMap[locale][key] === route
    );
    /**
     * Find the matching route for the new language
     */
    const matchingRoute = routeMap[language][routeKey];

    /**
     * Return localized route
     */
    return `/${getLocaleAbbrev(language)}` + matchingRoute;
  }
};

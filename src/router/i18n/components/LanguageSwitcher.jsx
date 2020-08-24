import React from "react";
import { AppLanguage } from "../../const";
import { NavLink, useLocation, Link } from "react-router-dom";
// import { useIntl } from 'react-intl';
import { list, link } from "theme";
import { useTranslation } from "react-i18next";
import { useContext } from "preact/hooks";
import { MyContext } from "../../../store/context";
import MenuItem from "@material-ui/core/MenuItem";

import { routeMap as routeMapDefault } from "..";
const routeMap = routeMapDefault.default;
import { getLocaleAbbrev } from "../../../utils";

export const LanguageSwitcher = ({ onClick }) => {
  const { store } = useContext(MyContext);
  const [t] = useTranslation("common");
  const locale = store.language;
  const { pathname } = useLocation();

  return (
    <div>
      {Object.keys(AppLanguage).map((lang) => (
        <MenuItem
          component={Link}
          to={getMatchingRoute(AppLanguage[lang])}
          onClick={onClick}
        >
          {t(`language.${AppLanguage[lang]}`)}
        </MenuItem>
      ))}
    </div>
  );

  function getMatchingRoute(language) {
    /**
     * Get the key of the route the user is currently on
     */
    const lang = getLocaleAbbrev(locale);
    const [_, route] = pathname.split(lang);

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

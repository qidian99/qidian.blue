import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { getDrawerIcon } from "../utils";

import { AppRoute, AppRouteTitles } from "../../const";
import { useContext } from "preact/hooks";
import { MyContext } from "../../../store/context";
import { getLocaleAbbrev } from "../../../utils";
import { useTranslation } from "react-i18next";
import { makeStyles, MenuItem } from "@material-ui/core";
import { defaultLanguage } from "../../../store/reducer";

const useStyles = makeStyles((theme) => ({
  activeMenu: {
    color: theme.palette.primary.light,
  },
}));

export const Navigation = () => {
  const [t] = useTranslation("common");
  const {
    store: { language = defaultLanguage },
  } = useContext(MyContext);
  const locale = getLocaleAbbrev(language);

  const classes = useStyles();

  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <React.Fragment>
      {Object.keys(AppRoute).map((elem) => {
        const menuLink = localizeRouteKey(AppRoute[elem]);
        // console.log("menuLink", menuLink);
        return (
          <MenuItem
            component={Link}
            to={menuLink}
            disabled={pathname === menuLink}
          >
            <Typography
              variant="h6"
              {...(pathname === menuLink
                ? { className: classes.activeMenu }
                : {})}
            >
              {t(AppRouteTitles.get(AppRoute[elem]) || "")}{" "}
            </Typography>
          </MenuItem>
        );
      })}
    </React.Fragment>
  );

  function localizeRouteKey(path) {
    return `/${locale}` + t(path);
  }
};

export const NavigationDrawer = () => {
  const [t] = useTranslation("common");
  const {
    store: { language },
  } = useContext(MyContext);
  const locale = getLocaleAbbrev(language);

  return (
    <List>
      {Object.keys(AppRoute).map((elem) => (
        <ListItem
          button
          key={elem}
          component={Link}
          to={localizeRouteKey(AppRoute[elem])}
        >
          <ListItemIcon>
            {/* <InboxIcon /> */}
            {getDrawerIcon(elem)}
          </ListItemIcon>
          <ListItemText primary={t(AppRouteTitles.get(AppRoute[elem]) || "")} />
        </ListItem>
      ))}
    </List>
  );

  function localizeRouteKey(path) {
    return `/${locale}` + t(path);
  }
};

//  <NavLink
//    exact
//    className={css(link.primary)}
//    activeClassName={css(link.active)}
//    to={localizeRouteKey(AppRoute[elem])}
//  >
//    {t(AppRouteTitles.get(AppRoute[elem]) || "")}
//  </NavLink>;

import React from "react";
import { Switch, RouteProps } from "react-router";
import { useTranslation } from "react-i18next";
import { useContext } from "preact/hooks";
import { MyContext } from "../../../store/context";

export const LocalizedSwitch = ({ children }) => {
  const [t] = useTranslation("common");
  const { store } = useContext(MyContext);
  const locale = store.language.substring(0, 2);
  /**
   * inject params and formatMessage through hooks, so we can localize the route
   */

  /**
   * Apply localization to all routes
   * Also checks if all children elements are <Route /> components
   */
  return (
    <Switch>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              path: localizeRoutePath(child.props.path),
            })
          : child
      )}
    </Switch>
  );

  /**
   *
   * @param path can be string, undefined or string array
   * @returns Localized string path or path array
   */
  function localizeRoutePath(path) {
    // console.log('path', path, t(path));
    switch (typeof path) {
      case "undefined":
        return undefined;
      case "object":
        return path.map((key) => {
          return `/${locale}` + t(key);
        });
      default:
        const isFallbackRoute = path === "*";
        return isFallbackRoute ? path : `/${locale}` + t(path);
    }
  }
};

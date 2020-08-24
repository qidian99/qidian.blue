import React from 'react';
import { Navigation } from "../../navigation";
import { LanguageSwitcher } from "../../i18n";
import AppBar from "../components/AppBar";

export const AppLayout = ({ children }) => (
  <div>
    <AppBar />
    <main>
      {children}
    </main>
  </div>
);

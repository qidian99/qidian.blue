import { SET_THEME, SET_LANGUAGE } from './actions';

export function reducer(state, action) {
  switch (action.type) {
    case SET_THEME: {
      return {
        ...state,
        theme: action.theme,
      };
    }
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return initialState;
  }
}

// export const defaultLanguage = 'zhCN'
export const defaultLanguage = 'enUS'
export const defaultTheme = 'dark'

export const initialState = {
  language: defaultLanguage,
  theme: defaultTheme,
};


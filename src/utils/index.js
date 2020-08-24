export const localeMap = {
  'en': 'enUS',
  'zh': 'zhCN',
}

export function getLocalization(locale) {
  return localeMap[locale] || localeMap['zh'];
}


export const getLocaleAbbrev = (locale) => (locale.substring(0, 2));

import { useTranslation } from 'react-i18next';

export const GeneralError = () => {
  const [t] = useTranslation('common');
  return (
    <section>
      <h1>{t("error.title")}</h1>
      <div>{t("error.content")}</div>
    </section>
  );
};

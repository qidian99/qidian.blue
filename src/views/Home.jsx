import { useTranslation } from "react-i18next";

export const Home = () => {
  const [t, i18n] = useTranslation("common");
  return (
    <section>
      <h1>{t("home.title")}</h1>
      <div>{t("home.content")}</div>
    </section>
  );
};

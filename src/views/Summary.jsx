import { useTranslation } from "react-i18next";

export const Summary = () => {
  const [t] = useTranslation("common");
  return (
    <section>
      <h1>{t("summary.title")}</h1>
      <div>{t("summary.content")}</div>
    </section>
  );
};

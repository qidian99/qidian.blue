import { useTranslation } from "react-i18next";

export const Projects = () => {
  const [t] = useTranslation("common");
  return (
    <section>
      <h1>{t("projects.title")}</h1>
      <div>{t("projects.content")}</div>
    </section>
  );
};

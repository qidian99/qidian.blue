import { useTranslation } from "react-i18next";

export const Resume = () => {
  const [t] = useTranslation("common");
  return (
    <section>
      <h1>{t("resume.title")}</h1>
      <div>{t("resume.content")}</div>
    </section>
  );
};

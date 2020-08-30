import { useTranslation } from 'react-i18next';
import Panel from '../components/Panel';
import { Typography } from '@material-ui/core';

export const GeneralError = () => {
  const [t] = useTranslation('common');
  return (
    <Panel>
      <Typography variant="h1" color="textPrimary">
        {t("error.title")}
      </Typography>
      <Typography variant="h2" color="textPrimary">{t("error.content")}</Typography>
    </Panel>
  );
};

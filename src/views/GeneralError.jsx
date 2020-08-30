import { useTranslation } from "react-i18next";
import Panel from "../components/Panel";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: "100vh",
  },
}));

export const GeneralError = () => {
  const [t] = useTranslation("common");
  return (
    <Panel spacing={0}>
      <Box p={6} className={classes.root}>
        <Typography variant="h1" color="textPrimary">
          {t("error.title")}
        </Typography>
        <Typography variant="h2" color="textPrimary">
          {t("error.content")}
        </Typography>
      </Box>
    </Panel>
  );
};

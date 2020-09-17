import { useTranslation } from "react-i18next";
import Panel from "../components/Panel";
import { Typography, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export const GeneralError = () => {
  const [t] = useTranslation("common");
  const classes = useStyles();
  return (
    <Panel spacing={0}>
      <Box
        p={6}
        className={classes.root}
        justifyContent="center"
        alignItems="center"
        display="flex"
        width="100vw"
        height="100%"
        flexDirection="column"
      >
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

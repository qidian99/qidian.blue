import {
  makeStyles,
  Box,
} from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme) => {
  return {
    offset: theme.mixins.toolbar, // for the toolbar
    padder: {
      flex: "0 1 auto",
    },
    remainder: {
      // flex: "1 1 auto",
      // justifyContent: 'flex-start',
    },
    panel: {
      overflowY: "hidden",
      height: "100%",
      width: "100%",
      display: "flex",
      flexFlow: "column",
      position: "absolute", // panels should be absolute when they shift in
      backgroundColor: theme.palette.primary.light,
    },
  };
});

const Panel = ({
  className,
  children,
  spacing = 6,
  BoxProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: "1",
    height: "100%",
  },
}) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.panel, className)}>
      <Box className={classNames(classes.offset, classes.padder)} />
      <Box className={classes.remainder} {...{ ...BoxProps, p: spacing }}>
        {children}
      </Box>
    </div>
  );
};

export default Panel;

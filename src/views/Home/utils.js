
import { TWEEN_IMAGE_BG_SIZE, TWEEN_IMAGE_PADDING } from '../../utils';
import GeiselImage from '../../assets/geisel.jpg';

import {
  makeStyles,
} from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
  return {
    /***
     * General Layout
     */
    root: {
      position: "relative", // the outer most containers should be relatively positioned
      top: 0,
    },
    container: {
      backgroundColor: theme.palette.background.paper,
      height: "100vh",
      width: "100%",
      position: "relative", // the pinner should be relatively positioned as well
      overflow: "hidden",
    },
    offset: theme.mixins.toolbar, // for the toolbar
    padder: {
      flex: "0 1 auto",
    },
    remainder: {
      flex: "1 1 auto",
    },
    content: {
      // for the typography content
      marginBottom: theme.spacing(6),
    },
    panel: {
      overflowY: "scroll",
      height: "100%",
      width: "100%",
      display: "flex",
      flexFlow: "column",
      position: "absolute", // panels should be absolute when they shift in
    },
    primaryBG: {
      backgroundColor: theme.palette.text.main,
    },
    lightBG: {
      backgroundColor: theme.palette.primary.light,
    },
    darkBG: {
      backgroundColor: theme.palette.primary.dark,
    },
    /***
     * MUI and other widgets
     */
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    splitText: {
      fontWeight: theme.typography.fontWeightBold,
    },
    tweenGridContainer: {
      width: (TWEEN_IMAGE_BG_SIZE + TWEEN_IMAGE_PADDING) * 3,
      height: (TWEEN_IMAGE_BG_SIZE + TWEEN_IMAGE_PADDING) * 3,
      marginTop: "5vh",
      marginBottom: "5vh",
    },
    panelGridContainer: {
      height: "100%",
    },
    tweenGridItem: {
      width: TWEEN_IMAGE_BG_SIZE + TWEEN_IMAGE_PADDING,
      height: TWEEN_IMAGE_BG_SIZE + TWEEN_IMAGE_PADDING,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    /***
     * Content Specific
     */
    introSection: {
      "&::before": {
        content: "''",
        backgroundSize: "cover",
        backgroundImage: `url(${GeiselImage})`,
        backgroundPosition: "center center",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.6,
      },
    },
    frontendSection: {},
    image: {
      width: 128,
      height: 128,
    },
  };
});


export const FADEOUT_TRIGGER = 0.5;
export const FADEOUT_THRESHOLD = 0.3; // from threshold to 1, home animation progress from 1 to 0

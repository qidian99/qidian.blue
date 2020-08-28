import { useTranslation } from "react-i18next";
import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useContext,
} from "preact/hooks";
import { Fragment } from "preact";
import { Reveal } from "react-gsap";
import {} from "../../utils";
import { makeStyles, Paper, Typography, Grid, Box } from "@material-ui/core";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import BookIcon from "@material-ui/icons/Book";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import ScrollMagic from "ScrollMagic";
import { gsap } from "gsap";
import classNames from "classnames";
import Panel from "../../components/Panel";
import { MyContext } from "../../store/context";

const T_PRE = "projects.experience";

const useStyles = makeStyles((theme) => {
  return {
    primaryBG: {
      backgroundColor: theme.palette.text.main,
    },
    lightBG: {
      backgroundColor: theme.palette.primary.light,
    },
    darkBG: {
      backgroundColor: theme.palette.primary.dark,
    },
    scrollY: {
      // overflowY: "scroll",
    },
    offset: {
      // marginTop: 64,
    },
    /***
     * MUI and other widgets
     */
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    timelinePaper: {
      padding: "6px 16px",
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
    /**
     * Detailed sections
     */
    projectGrid: {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      left: 0,
    },
    projectTimeline: {},
    projectDescription: {},
    descriptionWrapper: {
      position: "absolute",
    },
    description: {},
  };
});

export const ExperienceSection = () => {
  const [t] = useTranslation("common");

  const {
    store: { theme, language },
  } = useContext(MyContext);

  const classes = useStyles();

  const scrollRef = useRef(null);
  const rootRef = useRef(null);
  const tlRefs = useRef(Array(4).fill(null));
  const textRefs = useRef(Array(4).fill(null));
  const setTlRef = useCallback(
    (index) => (ref) => {
      tlRefs.current[index] = ref;
    },
    []
  );
  const setTextRef = useCallback(
    (index) => (ref) => {
      textRefs.current[index] = ref;
    },
    []
  );

  const [offset] = useState(
    window.innerHeight || document.documentElement.clientHeight
  );
  const controllerRef = useRef(new ScrollMagic.Controller());
  const [animation] = useState(new gsap.timeline());

  useEffect(() => {
    const controller = controllerRef.current;
    const scroll = scrollRef.current;
    const root = rootRef.current;
    const tls = tlRefs.current;
    const texts = textRefs.current;

    tls.forEach((tl, i) => {
      const id = "show" + i;
      animation
        .from(
          tl,
          1,
          {
            opacity: 0,
          },
          id
        )
        .from(
          texts[i],
          0.6,
          {
            delay: 0.4 ,
            opacity: 0,
          },
          "<"
        );

      if (i >= 1) {
        animation.to(
          texts[i - 1],
          0.4,
          {
            delay: 0,
            opacity: 0,
          },
          id
        );
      }
    });

    const scene = new ScrollMagic.Scene({
      duration: "300%",
      triggerElement: root,
      offset,
      triggerHook: 1,
      // triggerHook: 64 / window.innerHeight,
    })
      // .setPin(scroll)
      .setTween(animation)
      .addIndicators()
      .addTo(controller);

    return () => {
      console.log("cleaning up scene in experience section");
    };
  }, []);

  return (
    <Box
      width="100%"
      height="100%"
      className={classNames(classes.scrollY)}
      ref={rootRef}
    >
      <Grid
        className={classNames(classes.lightBG, classes.projectGrid)}
        container
        display="flex"
        justify="center"
        alignItems="center"
      >
        <Grid className={classes.projectTimeline} item xs sm={6}>
          <Timeline align="alternate">
            <TimelineItem ref={setTlRef(0)}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {t(`${T_PRE}.ibm.1_time`)}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <LaptopMacIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.timelinePaper}>
                  <Typography variant="h6" component="h1">
                    {t(`${T_PRE}.ibm.1_title`)}
                  </Typography>
                  <Typography>{t(`${T_PRE}.ibm.1_body`)}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem ref={setTlRef(1)}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {t(`${T_PRE}.ibm.2_time`)}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <BookIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {t(`${T_PRE}.ibm.2_title`)}
                  </Typography>
                  <Typography> {t(`${T_PRE}.ibm.2_body`)}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem ref={setTlRef(2)}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {t(`${T_PRE}.ibm.3_time`)}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined">
                  <DeveloperModeIcon />
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {t(`${T_PRE}.ibm.3_title`)}
                  </Typography>
                  <Typography>{t(`${T_PRE}.ibm.3_body`)}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem ref={setTlRef(3)}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {t(`${T_PRE}.ibm.4_time`)}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <AssignmentTurnedInIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {t(`${T_PRE}.ibm.4_title`)}
                  </Typography>
                  <Typography>{t(`${T_PRE}.ibm.4_body`)}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
        <Grid className={classes.projectDescription} item xs sm={6}>
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {textRefs.current.map((_, i) => (
              <div className={classes.descriptionWrapper} ref={setTextRef(i)}>
                <div className={classes.description}>
                  <Typography variant="h5" color="textPrimary">
                    {t(`${T_PRE}.ibm.${i + 1}_desc`)}
                  </Typography>
                </div>
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box
        width="100%"
        height="100%"
        className={classNames(classes.offset)}
        ref={scrollRef}
      ></Box>
    </Box>
  );
};

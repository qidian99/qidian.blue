import { useTranslation } from "react-i18next";
import { useEffect, useRef, useCallback, useState } from "preact/hooks";
import { Fragment } from "preact";
import { Reveal } from "react-gsap";
import {} from "../../utils";
import { useStyles } from "./utils";
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
import { TimelineMax } from "gsap";

const T_PRE = "home.experience";

export const ExperienceSection = () => {
  const [t] = useTranslation("common");

  const classes = useStyles();

  const rootRef = useRef(null);
  const tlRefs = useRef(Array(4).fill(null));
  const setRef = useCallback(
    (index) => (ref) => {
      tlRefs.current[index] = ref;
    },
    []
  );

  const [controller] = useState(new ScrollMagic.Controller());
  const [animation] = useState(new TimelineMax());

  // useEffect(() => {
  //   const root = rootRef.current;
  //   const tls = tlRefs.current;

  //   tls.forEach((tl) => {
  //     console.log(tl);
  //   });

  //   animation.fromTo(tls[0], '30%', {
  //     opacity: 0,
  //   }, {
  //     opacity: 1,
  //   }, 0);

  //   const scene = new ScrollMagic.Scene({
  //     duration: "100%",
  //     triggerElement: root,
  //     triggerHook: "onLeave",
  //   })
  //     .setPin(root)
  //     .setTween(animation)
  //     .addIndicators()
  //     .addTo(controller);
  // }, []);

  return (
    <Box ref={rootRef}>
      <Grid container display="flex">
        <Grid item xs={6}>
          <Timeline align="alternate">
            <TimelineItem ref={setRef(0)}>
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
            <TimelineItem ref={setRef(1)}>
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
            <TimelineItem ref={setRef(2)}>
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
            <TimelineItem ref={setRef(3)}>
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
        <Grid item xs={6}>
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" color="textPrimary">
              {t(`${T_PRE}.ibm.1_desc`)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

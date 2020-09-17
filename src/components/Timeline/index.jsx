import { useTheme } from "@material-ui/styles";

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
import { CutText, FadeIn } from "../../utils";
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

import ScrollMagic from "ScrollMagic";
import { gsap } from "gsap";
import classNames from "classnames";
import Panel from "../Panel";
import { MyContext } from "../../store/context";
import { getTimelineHeight, FADE_IN_DELAY, FADE_IN_DURATION } from "./config";
import TimelineCard from "./TimelineCard";

const T_PRE = "projects.experience";
const TITLE_FADEOUT_DURATION = 20;

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
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
    root: {
      width: "100%",
      height: "100vh",
      // overflowX: "hidden",
    },
    offset: theme.mixins.toolbar,
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
      padding: "0 1.5em",
    },
    projectTimeline: {
      maxHeight: "60vh",
      overflowY: "scroll",
    },
    projectDescription: {},
    descriptionWrapper: {
      position: "absolute",
    },
    description: {},
    timeline: {
      // transition: '1s',
      "-ms-overflow-style": "none",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none",
        width: 0,
      },
    },
    timelineItem: {
      minHeight: 0,
      // overflow: 'hidden',
    },
    splitText: {
      position: "absolute",
      textAlign: "center",
      width: "100%",
    },
  };
});

const CustomTimeline = ({
  timelineItems,
  debug = false,
  title,
  toolbar = true,
}) => {
  const [t] = useTranslation("common");

  const { store } = useContext(MyContext);
  const [length] = useState(timelineItems.length);

  const classes = useStyles();
  const scrollRef = useRef(null);
  const rootRef = useRef(null);
  const tlRefs = useRef(Array(length).fill(null));
  const tlHeightRefs = useRef(Array(length).fill(0));
  const timelineWrapperRef = useRef(null);

  const textRefs = useRef(Array(length).fill(null));
  const controllerRef = useRef(new ScrollMagic.Controller());
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const descriptionRef = useRef(null);
  const [animation] = useState(new gsap.timeline());
  const setTlRef = useCallback(
    (index) => (ref) => {
      tlRefs.current[index] = ref;
      // console.log(ref);
    },
    []
  );
  const setTextRef = useCallback(
    (index) => (ref) => {
      textRefs.current[index] = ref;
    },
    []
  );

  const setTimelineItemRef = useCallback(
    (index) => (ref) => {
      tlWrapperRefs.current[index] = ref;
    },
    []
  );

  const [offset] = useState(
    window.innerHeight || document.documentElement.clientHeight
  );

  useEffect(() => {
    const controller = controllerRef.current;
    const timeline = timelineRef.current;
    const root = rootRef.current;
    const tls = tlRefs.current;
    const texts = textRefs.current;
    const title = titleRef.current;
    const tlHeights = tlHeightRefs.current;

    tls.forEach((tl, i) => {
      tlHeights[i] = tl.offsetHeight;
      // console.log(tl.offsetHeight)

      const hidelabel = "none-" + i;
      const showLabel = "flex-" + i;
      animation
        .to(title, TITLE_FADEOUT_DURATION / 100, { opacity: 0 })
        .addLabel(showLabel)
        .fromTo(
          tl,
          i === 0 ? 0 : FADE_IN_DURATION,
          {
            display: "none",
          },
          {
            delay: i === 0 ? 0 : FADE_IN_DELAY,
            display: "flex",
            onUpdate: function () {
              const container = tl.parentElement.parentElement;
              if (container.scrollHeight > container.clientHeight) {
                container.scrollTop = container.scrollHeight;
              }
            },
            // onStart: function () {
            // console.log(
            //   "flex conversion started",
            //   tl,
            //   tl.parentElement,
            //   tl.parentElement.scrollTop
            // );
            // console.log(
            //   "flex conversion completed",
            //   tl,
            //   tl.parentElement.parentElement.scrollHeight,
            //   tl.parentElement.parentElement.clientHeight
            // );
            // const container = tl.parentElement.parentElement;
            // if (container.scrollHeight > container.clientHeight) {
            //   container.scrollTop = container.scrollHeight;
            // }
            // },
            // onComplete: function () {
            //   console.log(
            //     "flex conversion completed",
            //     tl,
            //     tl.parentElement.parentElement.scrollHeight,
            //     tl.parentElement.parentElement.clientHeight
            //   );
            //   const container = tl.parentElement.parentElement;
            //   if (container.scrollHeight > container.clientHeight) {
            //     container.scrollTop = container.scrollHeight;
            //   }
            // },
          },
          showLabel
        )
        .fromTo(
          tl,
          i === 0 ? 1 : FADE_IN_DURATION,
          {
            opacity: 0.3,
            maxHeight: 0,
            height: 0,
            overflow: "hidden",
          },
          {
            delay: i === 0 ? 0 : FADE_IN_DELAY,
            opacity: 1,
            maxHeight: tlHeights[i],
            height: tlHeights[i],

            overflow: "hidden",
            // onStart: function () {
            //   console.log(this, tl, tl.offsetHeight)
            // },
            // onUpdate: function() {
            //   console.log(tl.offsetHeight);
            // }
          },
          showLabel
        )
        .from(
          texts[i],
          0,
          {
            display: "none",
          },
          showLabel
        )
        .from(
          texts[i],
          i === 0 ? 1 : FADE_IN_DURATION,
          {
            delay: i === 0 ? 0 : FADE_IN_DELAY,
            opacity: 0,
          },
          showLabel
        );

      if (i >= 1) {
        animation.to(
          texts[i - 1],
          FADE_IN_DELAY,
          {
            opacity: 0,
          },
          showLabel
        );
      }
    });

    const scene = new ScrollMagic.Scene({
      duration: getTimelineHeight(length),
      triggerElement: root,
      offset,
      triggerHook: 1,
    })
      .setTween(animation)
      .on("progress", (e) => {
        // console.log(progress, timeline.scrollTop, timeline.offsetHeight);
      })
      .addTo(controller);

    if (debug) {
      scene.addIndicators();
    }

    // Show up all the presentations once the Tween and controller have been configured
    timeline.style = null;
    descriptionRef.current.style = null;

    return () => {
      console.log("cleaning up scene in experience section");
    };
  }, []);

  const theme = useTheme();

  return (
    <Box
      width="100%"
      height="100%"
      className={classNames(classes.root)}
      ref={rootRef}
    >
      <Grid
        style={{ padding: toolbar ? "64px 1.5em 0" : "0 1.5em" }}
        className={classNames(classes.lightBG, classes.projectGrid)}
        container
        display="flex"
        justify="center"
        alignItems="center"
      >
        {/* {toolbar && <Box className={classes.offset} />} */}
        <div ref={titleRef} style={{ marginBottom: toolbar ? "64px" : 0 }}>
          <Reveal
            // ref={function (r) {
            //   console.log(r);
            // }}
            repeat
            trigger={<div className={classes.splitText} />}
          >
            <CutText
              type={0}
              numberSlices={8}
              duration={1.2}
              fill={theme.palette.text.primary}
              fontSize={48}
            >
              {title}
            </CutText>
          </Reveal>
        </div>

        <Grid className={classes.projectTimeline} item xs={12} sm={6}>
          <Timeline
            style={{ visibility: "hidden" }}
            ref={timelineRef}
            className={classes.timeline}
            align="alternate"
          >
            {timelineItems.map((timelineItem, i, arr) => {
              const { time, topic, description, body, Icon } = timelineItem;
              return (
                <TimelineItem
                  className={classes.timelineItem}
                  ref={setTlRef(i)}
                >
                  <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                      {time}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={i % 2 == 0 ? "primary" : "secondary"}>
                      <Icon />
                    </TimelineDot>
                    {arr.length - 1 !== i && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} className={classes.timelinePaper}>
                      <Typography variant="h6" component="h1">
                        {topic}
                      </Typography>
                      <Typography>{body}</Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Grid>
        <Grid className={classes.projectDescription} item xs={12} sm={6}>
          <Box
            m={5}
            ref={descriptionRef}
            style={{ visibility: "hidden" }}
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {timelineItems.map(
              ({ description, image, imageHeight, alt }, i) => {
                let desc;

                if (image) {
                  desc = (
                    <TimelineCard
                      title={description}
                      alt={alt}
                      image={image}
                      imageHeight={imageHeight}
                    />
                  );
                } else {
                  desc = (
                    <div className={classes.description}>
                      <Typography variant="h5" color="textPrimary">
                        {description}
                      </Typography>
                    </div>
                  );
                }
                return (
                  <div
                    className={classes.descriptionWrapper}
                    ref={setTextRef(i)}
                  >
                    {desc}
                  </div>
                );
              }
            )}
          </Box>
        </Grid>
      </Grid>
      <Box
        // width="100%"
        height={getTimelineHeight(length + 1, TITLE_FADEOUT_DURATION)}
        className={classNames(classes.offset)}
        ref={scrollRef}
      ></Box>
    </Box>
  );
};

export default CustomTimeline;

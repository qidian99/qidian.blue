import { useTranslation } from "react-i18next";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "preact/hooks";
import { createContext, Fragment } from "preact";
import {
  SplitChars,
  Tween,
  Timeline,
  Reveal,
  PlayState,
  GsapControls,
  Controls,
} from "react-gsap";

// import Controls from '../components/gsap/Controls';
import { gsap, TimelineMax, TweenMax, Linear } from "gsap";
import ScrollMagic from "ScrollMagic";
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Paper,
  ButtonBase,
  Tooltip,
} from "@material-ui/core";
import classNames from "classnames";
import React from "react";

import {
  FadeIn,
  FadeInLeft,
  FadeInLeftChars,
  FadeInLeftWords,
  RubberBand,
  CutText,
  FadeInWithDelay,
  getBackgroundPosition,
  TweenGridIcon,
  TWEEN_IMAGE_BG_SIZE,
  TWEEN_IMAGE_PADDING,
} from "../utils";

import { MyContext } from "../store/context";
import { GRID_ICONS } from "../utils/assets";

import GeiselImage from "../assets/geisel.jpg";

const AnimationContext = createContext(null);

export const FADEOUT_TRIGGER = 0.5;
export const FADEOUT_THRESHOLD = (1 + FADEOUT_TRIGGER) / 2; // from threshold to 1, home animation progress from 1 to 0

const useStyles = makeStyles((theme) => {
  // console.log(theme);
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
    csSection: {},
    image: {
      width: 128,
      height: 128,
    },
  };
});

const HiTween = () => {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [t, i18n] = useTranslation("common");

  return (
    <AnimationContext.Consumer>
      {({ animPlayState }) => (
        <Fragment>
          <Reveal trigger={<div />}>
            <GsapControls
              playState={
                animPlayState === "play" ? PlayState.play : PlayState.reverse
              }
            >
              <Tween
                from={{ opacity: 0, x: "-100vw" }}
                ease="power1.inOut"
                stagger={0.1}
              >
                <SplitChars
                  wrapper={<span style={{ display: "inline-block" }} />}
                >
                  {t("home.prompt")}
                </SplitChars>
              </Tween>
            </GsapControls>
            {/* <FadeInLeftChars
              playState={
                animPlayState === "play" ? PlayState.play : PlayState.reverse
              }
              wrapper={<span style={{ display: "inline-block" }} />}
            >
              {t("home.prompt")}
            </FadeInLeftChars> */}
          </Reveal>
        </Fragment>
      )}
    </AnimationContext.Consumer>
  );
};

const IntroTween = () => {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [t, i18n] = useTranslation("common");
  const classes = useStyles();

  // const { animPlayState } = useContext(AnimationContext);
  // console.log("animPlayState", animPlayState);
  return (
    <AnimationContext.Consumer>
      {({ animPlayState }) => (
        <Fragment>
          <GsapControls
            playState={
              animPlayState === "play" ? PlayState.play : PlayState.reverse
            }
          >
            <FadeInWithDelay delay={1.2}>
              <Box position="relative" className={classes.content}>
                <Typography variant="h3" color="textPrimary" align="center">
                  {t("home.intro_general")}
                </Typography>
              </Box>
            </FadeInWithDelay>
          </GsapControls>
        </Fragment>
      )}
    </AnimationContext.Consumer>
  );
};

export const Home = (props) => {
  const [t, i18n] = useTranslation("common");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const [controller] = useState(new ScrollMagic.Controller());

  const [timeline] = useState(new TimelineMax({ paused: true }));

  const classes = useStyles();
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  const { store } = useContext(MyContext);

  const containerRef = useRef(null);
  const rootRef = useRef(null);

  const sectionsRef = useRef(Array(4).fill(null));

  const setRefs = useCallback(
    (i) => (ref) => {
      sectionsRef.current[i] = ref;
    },
    []
  );

  const [animPlayState, setAnimPlayState] = useState("play");

  useEffect(() => {
    const root = rootRef.current;
    const sections = sectionsRef.current;
    const offset = window.innerHeight;

    const fadeOutAnimation = new TimelineMax();
    // Set fade out animation for home page
    // fadeOutAnimation.to(sections[0], offset, { opacity: 0.3, delay: offset });
    fadeOutAnimation.fromTo(
      sections[0],
      offset,
      { opacity: 1, delay: offset },
      { opacity: 1, immediateRender: false }
    );

    // Fade out scene
    const scene = new ScrollMagic.Scene({
      triggerElement: root,
      triggerHook: FADEOUT_TRIGGER,
      duration: "100%",
    })
      .setTween(fadeOutAnimation)
      // .addIndicators({
      //   colorTrigger: "red",
      //   colorStart: "red",
      //   colorEnd: "red",
      //   indent: 40,
      // })
      .on("progress", function ({ progress }) {
        if (progress > FADEOUT_THRESHOLD) {
          if (animPlayState !== PlayState.reverse) {
            setAnimPlayState(PlayState.reverse);
          }
        } else {
          if (animPlayState !== PlayState.play) {
            setAnimPlayState(PlayState.play);
          }
        }
      })
      .addTo(controller);

    return () => {
      scene.destroy();
      fadeOutAnimation.invalidate();
    };
  }, [animPlayState]);

  useEffect(() => {
    const root = rootRef.current;
    const sections = sectionsRef.current;
    const offset = window.innerHeight;

    const panelAnimation = new TimelineMax();

    // Set entering animtion for each section
    sections.forEach((section, i) => {
      if (i === 0) return; // First page is not transformed by default
      panelAnimation.from(section, offset, {
        xPercent: 100,
        ease: Linear.easeNone,
        delay: 300,
      });
    });

    new ScrollMagic.Scene({
      triggerElement: root,
      triggerHook: "onLeave",
      duration: `${(sections.length - 1) * 100}%`,
    })
      .setPin(root)
      .setTween(panelAnimation)
      // .addIndicators({
      //   colorTrigger: "white",
      //   colorStart: "white",
      //   colorEnd: "white",
      //   indent: 40,
      // })
      .addTo(controller);
  }, []);

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
  }) => (
    <div className={classNames(classes.panel, className)}>
      <Box className={classNames(classes.offset, classes.padder)} />
      <Box className={classes.remainder} {...{ ...BoxProps, p: spacing }}>
        {children}
      </Box>
    </div>
  );
  const introSection = (
    <AnimationContext.Provider value={{ animPlayState }}>
      <Panel className={classes.introSection}>
        <Box position="relative" ref={headerRef}>
          <Typography
            className={classes.splitText}
            variant="h2"
            color="textPrimary"
            gutterBottom
          >
            <HiTween />
          </Typography>
        </Box>
        {/* <Reveal trigger={<div />}> */}
        <IntroTween />
        {/* </Reveal> */}
      </Panel>
    </AnimationContext.Provider>
  );

  const csSection = (
    <Panel spacing={6}>
      <Grid
        className={classes.panelGridContainer}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs>
          <Typography variant="h4" color="textPrimary" align="center">
            {t("home.intro_frontend")}
          </Typography>
        </Grid>
        <Grid item xs>
          <Reveal
            repeat
            trigger={
              <Box justifyContent="center" alignItems="center" display="flex" />
            }
          >
            {/* <Controls playState={PlayState.stop}> */}
            <Timeline>
              <Grid
                spacing={0}
                container
                className={classes.tweenGridContainer}
              >
                {GRID_ICONS.map(({ icon, name }) => (
                  <Grid item xs={4} className={classes.tweenGridItem}>
                    <Tooltip title={t(name)} arrow>
                      <TweenGridIcon icon={icon} />
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Timeline>
          </Reveal>
          {/* </Controls> */}
        </Grid>
      </Grid>
    </Panel>
  );

  return (
    <Box>
      <div className={classes.root} ref={rootRef}>
        <div className={classes.container} ref={containerRef}>
          <section
            ref={setRefs(0)}
            className={classNames(classes.panel, classes.primaryBG)}
          >
            {introSection}
          </section>
          <section
            ref={setRefs(1)}
            className={classNames(classes.panel, classes.lightBG)}
          >
            {csSection}
          </section>

          <section
            ref={setRefs(2)}
            className={classNames(classes.panel, classes.darkBG)}
          >
            <h1>Pin Panel B</h1>
          </section>

          <section
            ref={setRefs(3)}
            className={classNames(classes.panel, classes.lightBG)}
          >
            <h1>Pin Panel C</h1>
          </section>
        </div>
      </div>
    </Box>
  );
};

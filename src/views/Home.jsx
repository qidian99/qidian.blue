import { useTranslation } from "react-i18next";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "preact/hooks";
import { Tween, Timeline, Reveal } from "react-gsap";
import { gsap, TimelineMax, TweenMax, Linear } from "gsap";
import ScrollMagic from "ScrollMagic";
import "animation.gsap";
import "debug.addIndicators";
import $ from 'jquery';
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Paper,
  ButtonBase,
} from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import SplitText from '../../modules/SplitText.min'
import {
  FadeIn,
  FadeInLeft,
  FadeInLeftChars,
  FadeInLeftWords,
  RubberBand,
  CutText,
  FadeInWithDelay,
} from "../utils";

import GeiselImage from "../assets/geisel.jpg";
import { MyContext } from "../store/context";

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
    content: {
      // for the typography content
      marginBottom: theme.spacing(6),
    },
    panel: {
      height: "100%",
      width: "100%",
      position: "absolute", // panels should be absolute when they shift in
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

    /***
     * Content Specific
     */
    introSection: {
      "&::before": {
        content: "''",
        backgroundSize: "cover",
        backgroundImage: `url(${GeiselImage})`,
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

export const Home = (props) => {
  const [t, i18n] = useTranslation("common");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);

  const [timeline] = useState(new TimelineMax({ paused: true }));

  const classes = useStyles();
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  const { store } = useContext(MyContext);

  const containerRef = useRef(null);
  const rootRef = useRef(null);


  useEffect(() => {
    console.clear();
    const container = containerRef.current;
    const root = rootRef.current;
    const controller = new ScrollMagic.Controller();
    const sections = document.querySelectorAll("section");
    const tl = new TimelineMax();
    const offset = window.innerHeight;

    for (let i = 1; i < sections.length; i++) {
      console.log(sections[i]);
      tl.from(
        sections[i],
        1,
        { xPercent: 100, ease: Linear.easeNone },
        "+=1"
      );
    }

    new ScrollMagic.Scene({
      triggerElement: root,
      triggerHook: "onLeave",
      duration: "300%",
    })
      .setPin(root)
      .setTween(tl)
      .addIndicators({
        colorTrigger: "white",
        colorStart: "white",
        colorEnd: "white",
        indent: 40,
      })
      .addTo(controller);

    $("section").each(function (i) {
      // let target1 = $(this).find("h1");
      // let split = new SplitText(target1, { type: "chars" });
      // const tl = new TimelineMax();
      // tl.staggerFrom(
      //   split.chars,
      //   0.5,
      //   { opacity: 0, scale: 0.5, y: -100, ease: Bounce.easeOut },
      //   0.05
      // );

      // new ScrollMagic.Scene({
      //   triggerElement: root,
      //   triggerHook: 0,
      //   offset: i * offset,
      // })
      //   .setTween(tl)
      //   .addTo(controller)
      //   .addIndicators({
      //     colorTrigger: "white",
      //     colorStart: "white",
      //     colorEnd: "white",
      //     indent: 40,
      //   });
    });
  }, []);

  const Panel = ({
    className,
    children,
    BoxProps = {
      p: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      flex: "1",
      height: "100%",
    },
  }) => (
    <div className={classNames(classes.panel, className)}>
      <Box className={classes.offset} />
      <Box {...BoxProps}>{children}</Box>
    </div>
  );

  const introSection = (
    <Panel className={classes.introSection}>
      <Box position="relative" ref={headerRef}>
        <Typography
          className={classes.splitText}
          variant="h2"
          color="textPrimary"
          gutterBottom
        >
          <Reveal trigger={<div />}>
            <FadeInLeftChars
              wrapper={<span style={{ display: "inline-block" }} />}
            >
              {t("home.prompt")}
            </FadeInLeftChars>
          </Reveal>
        </Typography>
      </Box>
      <Reveal trigger={<div />}>
        <FadeInWithDelay delay={1.2}>
          <Box position="relative" className={classes.content} ref={contentRef}>
            <Typography variant="h3" color="textPrimary" align="center">
              {t("home.intro_general")}
            </Typography>
          </Box>
        </FadeInWithDelay>
      </Reveal>
    </Panel>
  );

  const csSection = (
    <Panel className={classes.csSection}>
      <Paper className={classes.paper}>
        <Box className={classes.offset}></Box>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}></ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography color="textPrimary">
                  {t("home.intro_cs")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Panel>
  );

  return (
    <Box className={classes.root} ref={rootRef}>
      <div className={classes.container} ref={containerRef}>
        <section className={classNames(classes.panel, classes.darkBG)}>
          {introSection}
        </section>
        <section className={classNames(classes.panel, classes.lightBG)}>
          <h1>Pin Panel A</h1>
        </section>

        <section className={classNames(classes.panel, classes.darkBG)}>
          <h1>Pin Panel B</h1>
        </section>

        <section className={classNames(classes.panel, classes.lightBG)}>
          <h1>Pin Panel C</h1>
        </section>
      </div>
    </Box>
  );
};

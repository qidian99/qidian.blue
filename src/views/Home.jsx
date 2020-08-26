import { useTranslation } from "react-i18next";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "preact/hooks";
import { Controller, Scene } from "react-scrollmagic";
import { TimelineMax, Power1, gsap } from "gsap";
import { Tween, Timeline, Reveal } from "react-gsap";

import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Paper,
  ButtonBase,
} from "@material-ui/core";
import classNames from "classnames";
import React, { forwardRef } from "react";
import styled from "styled-components";

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

const Wrapper = forwardRef((props, ref) => (
  <div ref={ref}>{props.children}</div>
));

const RevealStyled = styled.div`
  padding-top: 1000px;
  padding-bottom: 1000px;
  overflow: hidden;

  text-align: center;
  font-family: arial;
  font-size: 80px;

  h1 {
    font-size: 80px;
    font-weight: normal;
    margin: 0;
    padding: 60px 0;
  }

  svg {
    padding: 60px 0;
  }
`;

const RevealComponent = () => (
  <RevealStyled>
    <Reveal repeat>
      <FadeIn duration={2}>
        <h1>REACT-GSAP</h1>
      </FadeIn>
    </Reveal>
    <Reveal repeat trigger={<Wrapper />}>
      <FadeInLeft>
        <h1>AIIIIIIGHT</h1>
      </FadeInLeft>
    </Reveal>
    <Reveal repeat>
      <RubberBand>
        <h1>ONE MORE</h1>
      </RubberBand>
    </Reveal>
    <Reveal repeat trigger={<div />}>
      <FadeInLeftChars wrapper={<h1 style={{ display: "inline-block" }} />}>
        SPLIT IT UP
      </FadeInLeftChars>
    </Reveal>
    <Reveal repeat trigger={<div />}>
      <FadeInLeftWords wrapper={<h1 style={{ display: "inline-block" }} />}>
        SPLIT IT UP
      </FadeInLeftWords>
    </Reveal>
    <Reveal repeat trigger={<div />}>
      <CutText type={0} numberSlices={4}>
        CUT ME PLEASE
      </CutText>
    </Reveal>
    <Reveal repeat trigger={<div />}>
      <CutText type={1} numberSlices={4}>
        CUT ME PLEASE
      </CutText>
    </Reveal>
    <Reveal repeat trigger={<div className="sbbbb" />}>
      <CutText type={2} numberSlices={4}>
        CUT ME PLEASE
      </CutText>
    </Reveal>
  </RevealStyled>
);

const useStyles = makeStyles((theme) => {
  // console.log(theme);
  return {
    container: {
      backgroundColor: theme.palette.background.paper,
      height: "100vh",
      width: "100vw",
      // position: "absolute",
      textAlign: "center",
      overflow: "hidden",
    },
    generalIntro: {
      position: "fixed",
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
    csIntro: {
      backgroundColor: theme.palette.primary.light,
      height: "100vh",
      width: "100vw",
      position: "absolute",
      // top: 0,
      // right: 0,
      // bottom: 0,
      // left: 0,
      overflow: "hidden",
      textAlign: "center",
    },
    content: {
      marginBottom: theme.spacing(6),
    },
    offset: theme.mixins.toolbar,
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    splitText: {
      fontWeight: theme.typography.fontWeightBold,
    },
    pinContainer: {
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
    },
    panel: {
      height: "100vh",
      width: "100vw",
      position: "absolute",
      textAlign: "center",
    },
    lightBG: {
      backgroundColor: theme.palette.primary.light,
    },
    darkBG: {
      backgroundColor: theme.palette.primary.dark,
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
  console.log(store.theme, store.language);
  useEffect(() => {
    // forceUpdate();
    // timeline
    //   .from(headerRef.current, 0.5, {
    //     display: "none",
    //     autoAlpha: 0,
    //     delay: 0.25,
    //     ease: Power1.easeIn,
    //   })
    //   .from(contentRef.current, 0.4, {
    //     autoAlpha: 0,
    //     y: 25,
    //     ease: Power1.easeInOut,
    //   })
    //   .from(footerRef.current, 0.4, {
    //     autoAlpha: 0,
    //     y: 25,
    //     ease: Power1.easeInOut,
    //   });
    // timeline.play();
    // sectionRef.current.style.opacity = 1;
    // setTimeout(() => {
    //   timeline.reverse();
    //   const timelineDuration = timeline.duration() * 1000;
    //   setTimeout(() => {
    //     props.history.push("/en/resume");
    //   }, timelineDuration);
    // }, 5000);
  }, [store.language, store.theme]);

  const Container = ({ className, children }) => (
    <div className={classNames(classes.container, className)}>
      <Box className={classes.offset} />
      <Box
        p={6}
        // ref={sectionRef}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        flex="1"
        height="100%"
      >
        {children}
      </Box>
    </div>
  );

  const GeneralIntro = () => (
    <Container className={classes.generalIntro}>
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
    </Container>
  );

  const CSIntro = (
    <div className={classes.csIntro}>
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
    </div>
  );

  return (
    <Box>
      <GeneralIntro />
      <Controller>
        <Scene triggerHook="onLeave" duration="300%" pin>
          <Timeline wrapper={<div className={classes.pinContainer} />}>
            <Tween from={{ x: "-100%", delay: "100%" }} to={{ x: "0%" }}>
              <section className={classNames(classes.panel, classes.lightBG)}>
                <span>Panel</span>
              </section>
            </Tween>
            <Tween from={{ x: "100%", delay: "100%" }} to={{ x: "0%" }}>
              <section className={classNames(classes.panel, classes.darkBG)}>
                <span>Panel</span>
              </section>
            </Tween>
            <Tween from={{ y: "-100%", delay: "100%" }} to={{ y: "0%" }}>
              <section className={classNames(classes.panel, classes.lightBG)}>
                <span>Panel</span>
              </section>
            </Tween>
          </Timeline>
        </Scene>
      </Controller>
    </Box>
  );
};

import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "preact/hooks";
;
import { TimelineMax, Power1, gsap } from "gsap";
import { withRouter } from "react-router-dom";
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
import { Tween, Timeline, Reveal } from "react-gsap";

import {
  FadeIn,
  FadeInLeft,
  FadeInLeftChars,
  FadeInLeftWords,
  RubberBand,
  CutText,
} from "../utils";

import GeiselImage from "../assets/geisel.jpg";

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
      position: "absolute",
      textAlign: "center",
    },
    generalIntro: {
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
      position: "relative",
      height: "100vh",
      width: "100vw",
      position: "absolute",
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

  useEffect(() => {
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
  }, []);

  const Container = ({ className, children }) => (
    <div className={classNames(classes.container, className)}>
      <Box className={classes.offset} />
      <Box
        // p={6}
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
      <Timeline duration={2}>
        <FadeIn position="+=1">
          <Box position="relative" ref={headerRef}>
            <Typography variant="h2" color="textPrimary" gutterBottom>
              {t("home.prompt")}
            </Typography>
          </Box>
        </FadeIn>

        <FadeIn position="+=1">
          <Box position="relative" className={classes.content} ref={contentRef}>
            <Typography variant="h3" color="textPrimary" align="center">
              {t("home.intro_general")}
            </Typography>
          </Box>
        </FadeIn>
      </Timeline>
    </Container>
  );

  const CSIntro = (
    <div className={classes.csIntro}>
      <Container>
        <Paper className={classes.paper}>
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
      </Container>
    </div>
  );

  return <RevealComponent />;
};

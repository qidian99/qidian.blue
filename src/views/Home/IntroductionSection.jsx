import { useTranslation } from "react-i18next";
import { Fragment } from "preact";
import { useRef, useState, useEffect, useCallback } from "preact/hooks";

import { SplitChars, Tween, Reveal, GsapControls, PlayState } from "react-gsap";
import ScrollMagic from "ScrollMagic";
import { TimelineMax } from "gsap";
import { Typography, Box } from "@material-ui/core";

import { FadeInWithDelay } from "../../utils";
import { useStyles, FADEOUT_TRIGGER, FADEOUT_THRESHOLD } from "./utils";

export const IntroductionSection = ({ debug = true }) => {
  const classes = useStyles();
  const [t] = useTranslation("common");
  const rootRef = useRef(null);
  const animPlayState = useRef("play");
  const hiControlsRef = useRef(null);
  const introControlsRef = useRef(null);
  const lastScrollTop = useRef(
    window.pageYOffset || document.documentElement.scrollTop
  );
  const [offset] = useState(window.innerHeight);
  const [customAnimation] = useState(new TimelineMax());
  const [controller] = useState(new ScrollMagic.Controller());
  const [scrollPixelThreshold] = useState(
    document.documentElement.clientHeight * FADEOUT_THRESHOLD
  );

  const setFadeout = useCallback(
    (reverse) => {
      if (reverse) {
        animPlayState.current = PlayState.reverse;
        hiControlsRef.current.setPlayState(PlayState.reverse);
        introControlsRef.current.setPlayState(PlayState.reverse);
      } else {
        animPlayState.current = PlayState.play;
        hiControlsRef.current.setPlayState(PlayState.play);
        introControlsRef.current.setPlayState(PlayState.play);
      }
    },
    [animPlayState, hiControlsRef, introControlsRef]
  );

  const fadeOutListener = useCallback((e) => {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop.current) {
      // Downscrolled
      if (
        st > scrollPixelThreshold &&
        animPlayState.current != PlayState.reverse
      ) {
        setFadeout(true);
      }
    } else {
      // Upscrolled
      if (
        st < scrollPixelThreshold &&
        animPlayState.current != PlayState.play
      ) {
        setFadeout(false);
      }
    }

    lastScrollTop.current = st;
  }, []);

  // Register fade out listener
  useEffect(() => {
    window.addEventListener("scroll", fadeOutListener, false);
    return () => {
      window.removeEventListener("scroll", fadeOutListener);
    };
  }, []);

  return (
    <Fragment>
      <section ref={rootRef} className={classes.introSection}>
        <Box textAlign="center" position="relative">
          <Typography
            className={classes.splitText}
            variant="h2"
            color="textPrimary"
            gutterBottom
          >
            <Fragment>
              <Reveal trigger={<div />}>
                <GsapControls ref={hiControlsRef}>
                  <Tween
                    from={{ opacity: 0, x: "-100vw" }}
                    ease="power1.inOut"
                    stagger={0.075}
                  >
                    <SplitChars
                      wrapper={<span style={{ display: "inline-block" }} />}
                    >
                      {t("home.prompt")}
                    </SplitChars>
                  </Tween>
                </GsapControls>
              </Reveal>
            </Fragment>
          </Typography>
        </Box>
        {/* <Reveal trigger={<div />}> */}
        <GsapControls ref={introControlsRef}>
          <FadeInWithDelay delay={1.2}>
            <Box position="relative" className={classes.content}>
              <Typography variant="h3" color="textPrimary" align="center">
                {t("home.intro_general")}
              </Typography>
            </Box>
          </FadeInWithDelay>
        </GsapControls>
        {/* </Reveal> */}
      </section>
    </Fragment>
  );
};

import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect, useCallback } from "preact/hooks";
import { Fragment } from "preact";
import { SplitChars, Tween, Reveal, PlayState, GsapControls } from "react-gsap";

import { TimelineMax, Linear } from "gsap";
import ScrollMagic from "ScrollMagic";
import { Typography, Box } from "@material-ui/core";
import classNames from "classnames";
import React from "react";

import { FadeInWithDelay } from "../../utils";
import { useStyles, FADEOUT_TRIGGER, FADEOUT_THRESHOLD } from "./utils";
import {
  FrontendSection,
  BackendSection,
  ExperienceSection,
} from "./FrontendSection";

export const Home = () => {
  const [t] = useTranslation("common");
  const [controller] = useState(new ScrollMagic.Controller());

  const [] = useState(new TimelineMax({ paused: true }));

  const classes = useStyles();
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  const containerRef = useRef(null);
  const rootRef = useRef(null);

  const sectionsRef = useRef(Array(4).fill(null));

  const setRefs = useCallback(
    (i) => (ref) => {
      sectionsRef.current[i] = ref;
    },
    []
  );

  const animPlayState = useRef("play");
  const hiControlsRef = useRef(null);
  const introControlsRef = useRef(null);

  const [offset] = useState(window.innerHeight);
  const [panelAnimation] = useState(new TimelineMax());
  const [fadeOutAnimation] = useState(new TimelineMax());

  const resizeContainer = useCallback(() => {
    const root = rootRef.current;
    root.style.width = `${window.innerWidth}px`;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeContainer, false);
  }, []);

  useEffect(() => {
    // console.log("IN setting fadeout animation")
    const root = rootRef.current;
    const sections = sectionsRef.current;

    // Set fade out animation for home page
    fadeOutAnimation.fromTo(
      sections[0],
      offset,
      { opacity: 1 },
      {
        opacity: 0.7,
        immediateRender: true,
        delay: offset * 1.5,
      }
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
          if (animPlayState.current !== PlayState.reverse) {
            animPlayState.current = PlayState.reverse;
            hiControlsRef.current.setPlayState(PlayState.reverse);
            introControlsRef.current.setPlayState(PlayState.reverse);
          }
        } else {
          if (animPlayState.current !== PlayState.play) {
            animPlayState.current = PlayState.play;
            hiControlsRef.current.setPlayState(PlayState.play);
            introControlsRef.current.setPlayState(PlayState.play);
          }
        }
      })
      .addTo(controller);

    return () => {
      // console.log("Destorying scene", scene);
      scene.destroy();
      fadeOutAnimation.invalidate();
    };
  }, []);

  useEffect(() => {
    // console.log("IN setting scroll animation");

    const root = rootRef.current;
    const sections = sectionsRef.current;
    // Set entering animtion for each section
    sections.forEach((section, i) => {
      if (i === 0) return; // First page is not transformed by default

      section.style = null;
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
  }) => {
    return (
      <div className={classNames(classes.panel, className)}>
        <Box className={classNames(classes.offset, classes.padder)} />
        <Box className={classes.remainder} {...{ ...BoxProps, p: spacing }}>
          {children}
        </Box>
      </div>
    );
  };

  const introSection = (
    // <AnimationContext.Provider value={{ animPlayState }}>
    <Panel className={classes.introSection}>
      <Box position="relative">
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
      <Fragment>
        <GsapControls ref={introControlsRef}>
          <FadeInWithDelay delay={1.2}>
            <Box position="relative" className={classes.content}>
              <Typography variant="h3" color="textPrimary" align="center">
                {t("home.intro_general")}
              </Typography>
            </Box>
          </FadeInWithDelay>
        </GsapControls>
      </Fragment>
      {/* </Reveal> */}
    </Panel>
    // </AnimationContext.Provider>
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
            style={{ visibility: "hidden" }}
          >
            <Panel>
              <FrontendSection />
            </Panel>
          </section>

          <section
            ref={setRefs(2)}
            className={classNames(classes.panel, classes.darkBG)}
            style={{ visibility: "hidden" }}
          >
            <Panel>
              <BackendSection />
            </Panel>
          </section>

          <section
            ref={setRefs(3)}
            className={classNames(classes.panel, classes.lightBG)}
            style={{ visibility: "hidden" }}
          >
            <Panel>
              <ExperienceSection />
            </Panel>
          </section>
        </div>
      </div>
    </Box>
  );
};

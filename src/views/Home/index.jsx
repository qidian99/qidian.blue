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
import { FrontendSection } from "./FrontendSection";
import { BackendSection } from "./BackendSection";
import { ExperienceSection } from "./ExperienceSection";
import { IntroductionSection } from "./IntroductionSection";

import Swiper from "../../components/Swiper";

export const Home = () => (
  <Swiper
    // debug={true}
    sectionNodes={[
      IntroductionSection,
      FrontendSection,
      BackendSection,
      ExperienceSection,
    ]}
  />
);

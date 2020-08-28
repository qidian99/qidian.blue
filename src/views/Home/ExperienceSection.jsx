import { useTranslation } from "react-i18next";
import { useEffect } from "preact/hooks";
import { Fragment } from "preact";
import { Timeline, Reveal } from "react-gsap";

// import Controls from '../components/gsap/Controls';
import { Typography, Box, Grid, Tooltip } from "@material-ui/core";
import React from "react";

import {} from "../../utils";

import {
  MuiTimeline,
  // Panel
} from "../../components/mui";
import { useStyles } from "./utils";

export const ExperienceSection = () => {
  useEffect(() => {}, []);
  const [] = useTranslation("common");
  return <MuiTimeline />;
};

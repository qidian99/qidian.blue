import { useTranslation } from "react-i18next";
import { Fragment } from "preact";
import {
  Timeline,
  Reveal,
} from "react-gsap";
import {
  Typography,
  Box,
  Grid,
  Tooltip,
} from "@material-ui/core";
import React from "react";

import {
  FadeIn,
  getTooltipPosition,
  TweenGridIcon,
} from "../../utils";

import { BACKEND_GRID_ICONS } from "../../utils/assets";
import { useStyles } from "./utils";


export const BackendSection = () => {
  const classes = useStyles();
  const [t] = useTranslation("common");
  return (
    <Fragment>
      <Grid
        className={classes.panelGridContainer}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Reveal repeat>
            <FadeIn duration={2}>
              <Typography variant="h4" color="textPrimary" align="center">
                {t("home.intro_backend")}
              </Typography>
            </FadeIn>
          </Reveal>
        </Grid>
        <Grid item xs={6}>
          <Reveal
            repeat
            trigger={
              <Box
                justifyContent="center"
                alignItems="center"
                display="flex"
                p={6}
              />
            }
          >
            {/* <Controls playState={PlayState.stop}> */}
            <Timeline>
              <Grid
                spacing={0}
                container
                className={classes.tweenGridContainer}
              >
                {BACKEND_GRID_ICONS.map(({ icon, name }, i) => (
                  <Grid item xs={4} className={classes.tweenGridItem}>
                    <Tooltip
                      title={t(name)}
                      arrow
                      placement={getTooltipPosition(i)}
                    >
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
    </Fragment>
  );
};

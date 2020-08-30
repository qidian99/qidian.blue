import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback, useContext } from "preact/hooks";
import { Link } from "react-router-dom";

import WorkCard from "../../components/mui/Card";
import IBMImage from "../../assets/ibm_crl.png";
import ISAFEImage from "../../assets/isafe.png";
import ITSImage from "../../assets/its.png";
import Panel from "../../components/Panel";

import React from "preact/compat";
import { MyContext } from "../../store/context";
import { Grid, makeStyles, Box } from "@material-ui/core";

const T_PRE = "projects";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  grid: {
    overflowY: "scroll",
    maxHeight: '90vh',
  },
}));

const Projects = () => {
  const [t] = useTranslation("common");
  const [t2] = useTranslation("widget");
  const {
    store: { language },
  } = useContext(MyContext);
  const locale = language.substring(0, 2);
  const classes = useStyles();

  const ibmLink = `/${locale}${t("routes.ibm")}`;
  const isafeLink = `/${locale}${t("routes.isafe")}`;
  const IBMShareLink = React.forwardRef((props, ref) => (
    <Link ref={ref} to={ibmLink} {...props} />
  ));

  const ISAFEShareLink = React.forwardRef((props, ref) => (
    <Link ref={ref} to={isafeLink} {...props} />
  ));

  return (
    <Panel spacing={0}>
      <Box p={6} className={classes.root}>
        <Grid
          className={classes.grid}
          container
          spacing={6}
          justify="flex-start"
        >
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <WorkCard
              link={ibmLink}
              height="100%"
              title={t(`${T_PRE}.isafe3.title`)}
              body={t(`${T_PRE}.isafe3.body`)}
              image={ISAFEImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={ISAFEShareLink}
              RedirectLink={ISAFEShareLink}
            />
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <WorkCard
              link={ibmLink}
              height="100%"
              title={t(`${T_PRE}.isafe2.title`)}
              body={t(`${T_PRE}.isafe2.body`)}
              image={ISAFEImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={ISAFEShareLink}
              RedirectLink={ISAFEShareLink}
            />
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <WorkCard
              link={ibmLink}
              height="100%"
              title={t(`${T_PRE}.isafe.title`)}
              body={t(`${T_PRE}.isafe.body`)}
              image={ISAFEImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={ISAFEShareLink}
              RedirectLink={ISAFEShareLink}
            />
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <WorkCard
              link={ibmLink}
              height="100%"
              title={t(`${T_PRE}.ibm.title`)}
              body={t(`${T_PRE}.ibm.body`)}
              image={IBMImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={IBMShareLink}
              RedirectLink={IBMShareLink}
            />
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <WorkCard
              link={ibmLink}
              height="100%"
              title={t(`${T_PRE}.its.title`)}
              body={t(`${T_PRE}.its.body`)}
              image={ITSImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={ISAFEShareLink}
              RedirectLink={ISAFEShareLink}
            />
          </Grid>
        </Grid>
      </Box>
    </Panel>
  );
};

export default Projects;

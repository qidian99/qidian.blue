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

const T_PRE = "work";

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
  const isafeLink1 = `/${locale}${t("routes.isafe1")}`;
  const isafeLink2 = `/${locale}${t("routes.isafe2")}`;
  const isafeLink3 = `/${locale}${t("routes.isafe3")}`;
  const itsLink = `/${locale}${t("routes.its")}`;
  const IBMShareLink = React.forwardRef((props, ref) => (
    <Link ref={ref} to={ibmLink} {...props} />
  ));
  const ISAFEShareLink1 = React.forwardRef((props, ref) => (
    <Link ref={ref} to={isafeLink1} {...props} />
  ));
  const ISAFEShareLink2 = React.forwardRef((props, ref) => (
    <Link ref={ref} to={isafeLink2} {...props} />
  ));
  const ISAFEShareLink3 = React.forwardRef((props, ref) => (
    <Link ref={ref} to={isafeLink3} {...props} />
  ));
   const ITSShareLink = React.forwardRef((props, ref) => (
     <Link ref={ref} to={itsLink} {...props} />
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
              link={isafeLink3}
              height="100%"
              title={t(`${T_PRE}.isafe3.title`)}
              body={t(`${T_PRE}.isafe3.body`)}
              image={ISAFEImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={ISAFEShareLink3}
              RedirectLink={ISAFEShareLink3}
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
              link={isafeLink2}
              height="100%"
              title={t(`${T_PRE}.isafe2.title`)}
              body={t(`${T_PRE}.isafe2.body`)}
              image={ISAFEImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={ISAFEShareLink2}
              RedirectLink={ISAFEShareLink2}
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
              link={isafeLink1}
              height="100%"
              title={t(`${T_PRE}.isafe1.title`)}
              body={t(`${T_PRE}.isafe1.body`)}
              image={ISAFEImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={ISAFEShareLink1}
              RedirectLink={ISAFEShareLink1}
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
              link={itsLink}
              height="100%"
              title={t(`${T_PRE}.its.title`)}
              body={t(`${T_PRE}.its.body`)}
              image={ITSImage}
              shareButtonText={t2("button.share")}
              redirectButtonText={t2("button.more")}
              ShareLink={ITSShareLink}
              RedirectLink={ITSShareLink}
            />
          </Grid>
        </Grid>
      </Box>
    </Panel>
  );
};

export default Projects;

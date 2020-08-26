import React from "react";
import styled from "styled-components";
import {useState, useEffect, useRef} from 'preact/hooks'
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { TimelineLite, Linear } from "gsap";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  rotate: {
    transformOrigin: "0 100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  section: {
    height: "50vh",
  },
});

const Parallax = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [scaleTl] = useState(new TimelineLite({ paused: true }));
  const [rotateTl] = useState(new TimelineLite({ paused: true }));
  const cardRef = useRef(null);
  const [prog, setProgress] = useState(0);

  useEffect(() => {
    const el = cardRef.current;
    scaleTl.to(el, 1, { scale: Math.sqrt(2), ease:Linear.easeNone })
    rotateTl.to(el, 1, { rotateY: '45deg', rotateX: '45deg', ease:Linear.easeNone });
  }, []);

  const DictCard = ({ ref }) => (
    <Card className={classes.root} ref={ref}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );

  return (
    <Controller>
      <Scene indicators={true} duration="100%" triggerHook={0} pin>
        {/* <Timeline> */}
        {(progress) => {
          setProgress(progress);
          const ratio = 1 / Math.cos((1 / 4) * (prog - 0.5) * 2 * Math.PI);
          // console.log((ratio - 1) / (Math.sqrt(2) - 1));
          const scaleProgress =
            (prog - 0.5) * 2 > 0 ? (ratio - 1) / (Math.sqrt(2) - 1): 0;
          const rotateProgress = (prog - 0.5) * 2 > 0 ? (prog - 0.5) * 2 : 0;
          const containerProgress = prog * 2 > 1 ? 1 : prog * 2;
          scaleTl.progress(scaleProgress);
          rotateTl.progress(rotateProgress);

          return (
            <div className={"QNM"} style={{ margin: '10em', height: '100vh' }}>
              <Tween
                position="0"
                paused
                totalProgress={containerProgress}
                from={{
                  rotateY: 0,
                  rotateX: 0,
                }}
                to={{
                  rotateY: -45,
                  rotateX: 45,
                }}
              >
                <Paper className={classes.section}>
                  <div className={classes.rotate} ref={cardRef}>
                    <DictCard />
                  </div>
                </Paper>
              </Tween>
            </div>
          );
        }}
        {/* </Timeline> */}
      </Scene>
    </Controller>
  );
};

export default Parallax;

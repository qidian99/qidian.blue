import { Box, Grid, makeStyles } from "@material-ui/core";
import { useState, useCallback } from "preact/hooks";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useTranslation } from "react-i18next";

// Images
import BulletImage from "../images/bullet.png";
import Earth2Image from "../images/earth2.png";
import COREImage from "../images/core.png";
import UC3DImage from "../images/vayvay.png";
import HairlossImage from "../images/hairloss.png";
import BebinImage from "../images/bebin.png";
import FoodImage from "../images/food.png";
import PersonalbestImage from "../images/personalbest.png";
import MyTritonLinkImage from "../images/mytritonlink.png";
import HouseImage from "../images/house.png";

const getProjectImage = (index) => {
  switch (index) {
    case 1:
      return BulletImage;
    case 2:
      return Earth2Image;
    case 3:
      return COREImage;
    case 4:
      return UC3DImage;
    case 5:
      return HairlossImage;
    case 6:
      return BebinImage;
    case 7:
      return FoodImage;
    case 8:
      return PersonalbestImage;
    case 9:
      return MyTritonLinkImage;
    case 10:
      return HouseImage;
    default:
      return;
  }
};

const getProjectAvatar = (index) => {
  return ["", "B", "E", "C", "U", "H", "B", "F", "P", "M", "I"][index];
};

const useStyles = makeStyles((theme) => {
  return {
    bg: {
      backgroundColor: theme.palette.primary.light,
    },
    offset: theme.mixins.toolbar,
    root: {
      width: '100%',
      maxWidth: '80vw',
      // maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  };
});

const ProjectCard = ({ title, body, description, date, image, avatar }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{body}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Projects = () => {
  const classes = useStyles();

  const [t] = useTranslation("common");

  return (
    <div className={classes.bg}>
      <div className={classes.offset} />
      <Grid container spacing={0} justify="center">
        {Array(10)
          .fill(0)
          .map((_, i) => {
            const index = i + 1;
            const title = t(`projects.${index}_title`);
            const body = t(`projects.${index}_body`);
            const description = t(`projects.${index}_description`);
            const date = t(`projects.${index}_date`);
            const image = getProjectImage(index);
            const avatar = getProjectAvatar(index);
            return (
              <Grid container justify="center" item xs={12} sm={12}>
                <Box width="100%" p={6} display="flex" justifyContent="center">
                  <ProjectCard
                    avatar={avatar}
                    title={title}
                    description={description}
                    body={body}
                    date={date}
                    image={image}
                  ></ProjectCard>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Projects;

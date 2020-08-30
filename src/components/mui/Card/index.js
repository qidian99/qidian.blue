import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  separator: {
    flex: '1 1 auto',
  }
});

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/" {...props} />
));


export default function ImgMediaCard({
  image,
  title,
  body,
  imageHeight = "140",
  shareButtonText = 'Share',
  redirectButtonText = 'Learn More',
  alt = 'image',
  link = null,
  ShareLink = LinkBehavior,
  RedirectLink = LinkBehavior,
  height,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} {...(height ? { style: { height } } : {})}>
      <CardActionArea href={link}>
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={alt}
          title={alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.separator}></div>
      <CardActions>
        <Button size="small" color="secondary" component={ShareLink}>
          <Typography color="textSecondary">
            {shareButtonText}
          </Typography>
        </Button>
        <Button size="small" color="secondary" component={RedirectLink}>
          <Typography color="textSecondary">
            {redirectButtonText}
          </Typography>
        </Button>
      </CardActions>
    </Card >
  );
}

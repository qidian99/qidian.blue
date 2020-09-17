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
    // maxWidth: '40vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  separator: {
    flex: '1 1 auto',
  }
});

export default function TimelineCard({
  image,
  title,
  body,
  imageHeight = "300",
  alt = 'image',
  height = null,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} {...(height ? { style: { height } } : {})}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom color="textPrimary" variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={alt}
          title={alt}
        />
      </CardActionArea>
    </Card >
  );
}

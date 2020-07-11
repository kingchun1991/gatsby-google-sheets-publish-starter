import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';
import { withLanguage } from '@/libraries/helper/i18n';
import _get from 'lodash.get';

const styles = theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});
function ItemCard(props) {
  //const classes = useStyles();
  const { classes, item } = props
  const { i18n } = useTranslation();


  const title = withLanguage(
    i18n,
    _get(item, 'node', {}),
    'title'
  );
  const detail = withLanguage(
    i18n,
    _get(item, 'node', {}),
    'detail'
  );


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${item.node.productImage.publicURL}`}
          title={`${title}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${title}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${detail}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(ItemCard)

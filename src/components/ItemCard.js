import React, { useEffect } from 'react';
<<<<<<< HEAD
import { withStyles } from '@material-ui/core/styles';
=======
import { withStyles } from "@material-ui/core/styles";
>>>>>>> b8d8545e547f4a7be2c5f5ccd6b519f419bce286
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { red } from '@material-ui/core/colors';

import ShareButton from '@/components/ShareButton';

import { useTranslation } from 'react-i18next';
import { withLanguage } from '@/utils/i18n';
import _get from 'lodash.get';

const styles = () => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  avatar: {
    backgroundColor: red[500],
  },
});
function ItemCard(props) {
  const { classes, item, locale, ssr } = props;
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [i18n, locale]);
  // since ssr does not have useEffect.
  // a little bit hacky but welcome for a better solution
  if (ssr && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  const title = withLanguage(i18n, _get(item, 'node', {}), 'title');
  const detail = withLanguage(i18n, _get(item, 'node', {}), 'detail');

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            B
          </Avatar>
        }
        action={
          <IconButton aria-label="share">
            <ShareButton id={item.id} />
          </IconButton>
        }
        title={`${title}`}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={`${item.node.productImage.publicURL}`}
        title={`${title}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${detail}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${item.node.id}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ItemCard);
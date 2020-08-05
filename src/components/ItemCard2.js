import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ShareButton from '@/components/ShareButton';

import { useTranslation } from 'react-i18next';
import { withLanguage } from '@/utils/i18n';
import _get from 'lodash.get';

import moment from 'moment';
import tz from 'moment-timezone';


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
function ItemCard2(props) {
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
  

  const title = withLanguage(i18n, item, 'title');
  const detail = withLanguage(i18n, item, 'detail');
  
  const datetimefromtwitter = moment(`${item.datetime}`).tz('America/New_York')
  const sinceNow = datetimefromtwitter.isValid ? datetimefromtwitter.fromNow().toString() : ''

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            B
          </Avatar>
        }
        action={
          <ShareButton id={item.id} />
        }
        title={`${title}`}
        subheader={`${sinceNow}`}
      />
      <CardMedia
        className={classes.media}
        image={`${item.imgSrc}`}
        title={`${title}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${detail}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${item.id}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ItemCard2);
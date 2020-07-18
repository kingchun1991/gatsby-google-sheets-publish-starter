import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Img from 'gatsby-image';

import { useTranslation } from 'react-i18next';
import { withLanguage } from '@/utils/i18n';
import _get from 'lodash.get';

const styles = () => ({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 600,
  },
});
function ItemContent(props) {
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

  return (
    <Box>
      <Typography gutterBottom variant="h5" component="h2">
        {`${title}`}
      </Typography>
      <Img
        alt={`Picture of ${title}`}
        fluid={item.productImage.childImageSharp.fluid}
      />
      <Typography variant="body2" color="textSecondary" component="p">
        {`${detail}`}
      </Typography>
      <Button variant="contained" color="primary">
        Buy
      </Button>
    </Box>
  );
}

export default withStyles(styles)(ItemContent);
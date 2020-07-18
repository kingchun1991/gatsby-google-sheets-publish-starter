import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import { FaGithub, FaFacebook } from 'react-icons/fa';
import { openInNewTab } from '@/utils';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    marginTop: 'auto',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 700,
  },
  noStyle: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  text: {
    fontSize: 12,
  },
}));

export default function Footer() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div position="static" className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className={classes.title}>
              {t('site.title')}
            </Typography>
            <div className={classes.text}>
              <p>{t('site.disclaimer1')}</p>
            </div>

            <Grid
              container
              spacing={1}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid
                item
                className="clickable"
                onClick={() =>
                  openInNewTab('https://github.com/')}
              >
                {/* <FaGithub /> */}
              </Grid>
              <Grid
                item
                className="clickable"
                onClick={() => openInNewTab('https://fb.me/')}
              >
                {/* <FaFacebook /> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="body1" className={classes.subtitle}>
              {t('footer.other_websites')}
            </Typography>
            <div className={classes.text}>
              <p>
                <a
                  className={classes.noStyle}
                  href="http://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.other_websites.google')}
                </a>
              </p>
              <p>
                <a
                  className={classes.noStyle}
                  href="http://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.other_websites.google')}
                </a>
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" className={classes.subtitle}>
              {t('footer.source')}
            </Typography>
            <div className={classes.text}>
              <p>{t('site.disclaimer2')}</p>
            </div>
            <div className={classes.text}>
              <p>
                <a
                  className={classes.noStyle}
                  href="http://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.other_websites.google')}
                </a>
              </p>
              <p>
                <a
                  className={classes.noStyle}
                  href="http://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.other_websites.google')}
                </a>
              </p>
              <p>
                <a
                  className={classes.noStyle}
                  href="http://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.other_websites.http://www.google.com/')}
                </a>
              </p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

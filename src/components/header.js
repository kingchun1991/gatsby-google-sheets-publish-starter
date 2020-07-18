import React from 'react';
import { navigate, Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LanguageSwitcher from '@components/LanguageSwitcher';
import { getLocalizedPath } from '@/utils/i18n';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    flexGrow: 1,
  },
  toolBar: {
    padding: 0,
    margin: 0,

  },
  title: {
    flexGrow: 1,
  },
  button:{
    position: 'absolute',
    'padding-right': 10,
    right: 30,
  }
}));

const renderTitle = () => {
  return { __html: 'Gatsby Google Sheets Publish Starter' };
};

export default function Header() {
  const classes = useStyles();
  const { i18n } = useTranslation();
  return (
    <>
      <AppBar position="fixed" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolBar}>
            <Typography
              variant="h1"
              className={`${classes.title} clickable`}
              dangerouslySetInnerHTML={renderTitle()}
              onClick={() => {
                navigate(getLocalizedPath(i18n, '/'));
              }}
            />
          <Button color="inherit" className={classes.button}><Link to={getLocalizedPath(i18n, `/page-2`)}>Page 2</Link></Button>
          <LanguageSwitcher />
          </Toolbar>
        </Container>
      </AppBar>
      {/* render a second <Toolbar /> component to solve invisible content issue */}
      <Toolbar />
    </>
  );
}

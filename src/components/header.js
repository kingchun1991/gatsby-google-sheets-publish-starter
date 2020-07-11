import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LanguageSwitcher from '@components/LanguageSwitcher';

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
  menuButton: {},
  title: {
    flexGrow: 1,
  },
}));

const renderTitle = () => {
  return { __html: 'Gatsby Google Sheets Publish Starter' };
};

export default function Header() {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolBar}>
            <Typography
              variant="h1"
              className={`${classes.title} clickable`}
              dangerouslySetInnerHTML={renderTitle()}
            />
            <LanguageSwitcher />
          </Toolbar>
        </Container>
      </AppBar>
      {/* render a second <Toolbar /> component to solve invisible content issue */}
      <Toolbar />
    </>
  );
}

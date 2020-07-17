import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ContextStoreProvider } from '@/contextStore';
import { createDynamicTheme } from '@/components/theme';
import { ThemeProvider } from 'styled-components';
import Header from '@components/header';
import Footer from './footer';
import './layout.css';

const ThemeProviderWrapper = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(() => createDynamicTheme({ prefersDarkMode }), [
    prefersDarkMode,
  ]);

  const useStyles = makeStyles(t => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: theme.palette.background.paper,
    },
    container: {
      marginBottom: t.spacing(3),
    },
  }));

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Container maxWidth="lg" className={classes.container}>
            <Header />
            <main>{children}</main>
          </Container>
          <Footer />
        </div>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

const Layout = ({ children, initialStore }) => {
  return (
    <ContextStoreProvider initialStore={initialStore}>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </ContextStoreProvider>
  );
};

export default Layout;

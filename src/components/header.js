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
import IconButton from '@material-ui/core/IconButton';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  button: {
    position: 'absolute',
    // 'padding-right': 10,
    right: 35,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


const renderTitle = () => {
  return { __html: 'Gatsby Google Sheets Publish Starter' };
};

export default function Header() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = 'primary-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button aria-label="show 4 new mails"
          color="inherit"
          startIcon={<StorefrontIcon />}
          href={`/real-time-fetch`}>
          <p> Real Time Fetch </p>
        </Button>
      </MenuItem>
      <MenuItem>
        <LanguageSwitcher />
        <p>{t('lang.zh')}</p>
      </MenuItem>
    </Menu>
  );

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
            <div className={classes.sectionDesktop}>
              <Button variant="outlined" color="primary"
                size="small"
                startIcon={<StorefrontIcon />}
                className={classes.button}
                target="_blank"
                rel="bsg"
                href={`https://store.ballshoesguide.com/`}>
                {t('header.hkStore')}
              </Button>
              {/* <Button color="inherit" className={classes.button}><Link to={getLocalizedPath(i18n, `/page-2`)}>Page 2</Link></Button> */}
              <LanguageSwitcher />
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {/* render a second <Toolbar /> component to solve invisible content issue */}
      <Toolbar />
      {renderMobileMenu}
    </>
  );
}

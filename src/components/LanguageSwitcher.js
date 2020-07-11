import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TranslateIcon from '@material-ui/icons/Translate';
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';
import ContextStore from '@/contextStore';
import { removePathTrailingSlash } from '@/utils/urlHelper';

const RightIconButton = styled(IconButton)`
  && {
    position: absolute;
    padding-right: 0;
    right: 0;
  }
`;

function LanguageSwitcher() {
  let {
    route: {
      state: { fullPath },
    },
  } = React.useContext(ContextStore);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleButtonClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleButtonClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = lng => {
    setAnchorEl(null);
    if (lng === 'en' && !fullPath.includes('/en')) {
      fullPath = removePathTrailingSlash(fullPath.replace('/', '/en/'));
      navigate(fullPath, { replace: true });
    } else if (lng === 'zh' && fullPath.includes('/en')) {
      fullPath = removePathTrailingSlash(fullPath.replace('/en', ''));
      navigate(fullPath, { replace: true });
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <RightIconButton
        color="inherit"
        component="span"
        aria-label="Language Switcher"
        aria-controls="lang-menu"
        aria-haspopup="true"
        onClick={handleButtonClick}
      >
        <TranslateIcon />
      </RightIconButton>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleButtonClose}
      >
        <MenuItem onClick={() => changeLanguage('zh')}>
          {/* 中文 */}
          {t('lang.zh')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>
          {/* English */}
          {t('lang.en')}
        </MenuItem>
      </Menu>
    </>
  );
}

export default LanguageSwitcher;

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PageContext = React.createContext({});

export const PageContextProvider = ({ pageContext, children, ssr }) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    // add the checking here to avoid re-rendering
    if (i18n.language.toLowerCase() !== pageContext.lang) {
      i18n.changeLanguage(pageContext.lang);
    }
  }, [i18n, pageContext.lang]);

  // if it is triggered from SSR, change language and trigger re-render during rendering since 
  if (ssr && i18n.language.toLowerCase() !== pageContext.lang) {
    i18n.changeLanguage(pageContext.lang);    
  }

  return <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>;
};

export const usePageContext = () => React.useContext(PageContext);
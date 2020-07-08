import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { PageContextProvider } from '@/components/templates/PageContext';
import { createInstance } from '@/i18n';


/**
 * Wrap all pages with a Translation provider and set the language on SSR time
 */
export const wrapPageElement = ({ element, props }) => {
  const { pageContext } = props;
  const { lang } = pageContext;
  return (
    <I18nextProvider i18n={createInstance(lang)}>
      <PageContextProvider pageContext={pageContext}>{element}</PageContextProvider>
    </I18nextProvider>
  );
};
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react';
import '@/i18n';
import I18nWrapper from '@/components/I18nWrapper';
import Layout from '@/components/layout';

export const wrapPageElement = ({
  element,
  props: {
    pageContext: { locale },
  },
}) => {
  return (
    <I18nWrapper locale={locale} ssr>
      <Layout>
        {element}
      </Layout>
    </I18nWrapper>
  );
};

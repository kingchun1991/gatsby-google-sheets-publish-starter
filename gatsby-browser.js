/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React, { useEffect } from 'react';
import '@/i18n';
import I18nWrapper from '@/components/I18nWrapper';
import ContextStore from '@/contextStore';
import { ROUTE_CHANGE } from '@/reducers/route';
import Layout from '@/components/layout';

// update the route
const Router = ({ path }) => {
  // some shit when useStaticQuery here..
  const {
    route: { dispatch },
  } = React.useContext(ContextStore);
  let actualPath = path;
  // TODO: dynamic langauges from somewhere?
  actualPath = actualPath.replace(/^\/en(?!\w)/, '') || '/';

  useEffect(() => {
    dispatch({ type: ROUTE_CHANGE, path: actualPath, fullPath: path });
  }, [actualPath, path, dispatch]);
  return null;
};

export const wrapPageElement = ({
  element,
  props: {
    pageContext: { locale },
    uri,
  },
}) => {
  return (
    <I18nWrapper locale={locale}>
      <Layout>
        <Router path={uri} />
        {element}
      </Layout>
    </I18nWrapper>
  );
};

// Wrap the theme
// export const wrapRootElement = ({ element }) => {
//   return <Layout>{element}</Layout>;
// };

import React from 'react';
import { Link, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import _get from 'lodash.get';

import Layout from '@/components/layout';
import Image from '@/components/image';
import SEO from '@/components/seo';
import { withLanguage } from '@/libraries/helper/i18n';

const IndexPage = ({ data }) => {
  const { i18n } = useTranslation();

  const username = withLanguage(
    i18n,
    _get(data, 'allKeyValue.edges[0].node', {}),
    'value'
  );
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>
        Welcome,
        {/* The value from the google spreadsheet */}
        {username}
      </p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    allKeyValue(filter: { key: { eq: "username" } }) {
      edges {
        node {
          key
          value_zh_hk
          value_en
        }
      }
    }
  }
`;

export default IndexPage;

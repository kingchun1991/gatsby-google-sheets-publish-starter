/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from 'react-i18next';
import _isEmpty from 'lodash.isempty';
import ContextStore from '@/contextStore';

function SEO({ meta, uri, titleOveride }) {
  const { t, i18n } = useTranslation();

  const {
    route: {
      state: { path, fullPath },
    },
  } = React.useContext(ContextStore);

  const { site, configJson } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        configJson {
          languages
          pages {
            title
            to
            icon
          }
        }
      }
    `
  )

  const metaDescription =  t('app.description')

  const currentPage = configJson.pages.find(p => p.to === path) || {};
  let title = '';
  if (titleOveride) {
    title = titleOveride;
  } else {
    title = _isEmpty(currentPage) ? t('index.title') : t(currentPage.title);
    if (_isEmpty(currentPage) && !uri) {
      console.error(
        `cannot look up page title. check the settings for path: ${path}`
      );
    }
  }
  const localePath = i18n.language === 'zh' ? '' : `${i18n.language} /`;

  const siteURL = uri
    ? `${site.siteMetadata.siteUrl}/${localePath}${uri}`
    : `${site.siteMetadata.siteUrl}${fullPath}`;
  return (
    <Helmet
      htmlAttributes={{
        lang: i18n.language,
      }}
      title={title}
      titleTemplate={`%s | ${t('app.title')}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: 'og:url',
          content: siteURL,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO

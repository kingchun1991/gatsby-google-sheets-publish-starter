const csv2json = require('csvtojson');
const fetch = require('node-fetch');
const config = require('./gatsby-config');

const { getPath } = require('./src/utils/urlHelper');

const isDebug = process.env.NODE_ENV !== 'production';
const LANGUAGES = ['zh', 'en'];
const path = require('path');

const createPublishedGoogleSpreadsheetNode = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  publishedURL,
  type,
  { skipFirstLine = false, alwaysEnabled = false, subtype = null }
) => {
  // All table has first row reserved
  const result = await fetch(
    `${publishedURL}&single=true&output=csv&headers=0${
    skipFirstLine ? "&range=A2:ZZ" : ""
    }`
  )
  const data = await result.text()
  const records = await csv2json().fromString(data)
  records
    .filter(
      r => alwaysEnabled || (isDebug && r.enabled === "N") || r.enabled === "Y"
    )
    .forEach((p, i) => {
      // create node for build time data example in the docs
      const meta = {
        // required fields
        id: createNodeId(
          `${type.toLowerCase()}${subtype ? `-${subtype}` : ""}-${i}`
        ),
        parent: null,
        children: [],
        internal: {
          type,
          contentDigest: createContentDigest(p),
        },
      }
      const node = { ...p, subtype, ...meta }
      createNode(node)
    })
}


exports.sourceNodes = async props => {
  await Promise.all([
    createPublishedGoogleSpreadsheetNode(
      props,
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMf21Q2u8IXza55EClr4tlEn-hpHwoyZGxqS1Wy9xfjDRF5fy0MGjice0i2ONIaoIdp72pHQem7O6Z/pub?gid=0',
      "Item",
      { skipFirstLine: true }
    ),
  ]);
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  return new Promise(resolve => {
    // If it is already eng path we skip to re-generate the locale
    if (!page.path.match(/^\/en/)) {
      deletePage(page);
      LANGUAGES.forEach(lang => {
        createPage({
          ...page,
          path: getPath(lang, page.path),
          context: {
            ...page.context,
            locale: lang,
          },
        });
      });
    }
    resolve();
  });
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allItem {
        edges {
          node {
            id
            title_en
            title_zh
            description_en
            description_zh
            detail_en
            detail_zh
            datetime
            productImage {
              publicURL
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.resolve(false);
    }
    const items = result.data.allItem.edges;

    // create share page
    items.forEach(edge => {
      LANGUAGES.forEach(lang => {
        const id = edge.node.id;
        const uri = getPath(lang, `/item/${id}`);

        createPage({
          path: uri,
          component: path.resolve(`./src/components/templates/SingleItem.js`),
          context: {
            uri: uri,
            itemId: id,
            locale: lang,
          },
        });
      });
    });
  });
};

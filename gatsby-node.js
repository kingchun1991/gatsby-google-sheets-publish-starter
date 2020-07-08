const csv2json = require('csvtojson');
const fetch = require('node-fetch');
const config = require('./gatsby-config');

const isDebug = process.env.NODE_ENV !== 'production';

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
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSp3oltt5RkGHzhSBQ24J9cNZXL8YWF4gvVdJFe5tXRgJ9lM9ZNxDeKWgPmYebAeIFuuts4ktiwh78f/pub?gid=0&single=true&output=csv',
      "KeyValue",
      { skipFirstLine: true }
    ),
  ]);
};

exports.onCreatePage = async ({ page, actions: { createPage, deletePage } }) => {
  const originalPath = page.path;

  // Delete the original page (since we are gonna create localized versions of it)
  await deletePage(page);


  // create the alias for '/' using zh-hk
  await createPage({
    ...page,
    path: originalPath,
    context: {
      ...page.context,
      originalPath,
      lang: 'zh-hk',
    },
  });


  await Promise.all(
    config.siteMetadata.supportedLanguages.map(async ({ locale }) => {
      const localizedPath = `/${locale}${page.path}`;
      await createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          originalPath,
          lang: locale,
        },
      });
    })
  );
};


/**
 * No import syntax as this is needed for gatsby-node.js (dont want to setup babel lol)
 */

const removePathTrailingSlash = _path =>
  _path === '/' ? _path : _path.replace(/\/$/, '');

const getPath = (lang, path) =>
  removePathTrailingSlash(`${lang === 'zh' ? '' : `/${lang}`}${path}`);

module.exports = {
  getPath,
  removePathTrailingSlash,
};

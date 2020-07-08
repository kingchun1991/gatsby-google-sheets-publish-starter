export const getLocalizedPath = (locale, path) => {
  if (locale !== 'zh-hk') {
    return `/${locale}${path}`;
  }
  return path;
}
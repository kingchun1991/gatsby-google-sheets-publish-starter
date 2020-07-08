export const getLocalizedPath = (locale, path) => {
  if (locale !== 'en') {
    return `/${locale}${path}`;
  }
  return path;
};

import { get } from '@/utils/';
import { removePathTrailingSlash } from '@/utils/urlHelper';

export const withLanguage = (
  i18n,
  object,
  path,
  checkPendingTranslation = false
) => {
  if (
    checkPendingTranslation &&
    i18n.language === 'en' &&
    get(object, `${path}_zh`) &&
    !get(object, `${path}_en`)
  ) {
    // Add prefix for untranslated text
    return `[Pending Translation] ${get(object, `${path}_zh`)}`;
  }

  return (
    get(object, `${path}_${i18n.language}`) || get(object, `${path}_zh`) || ''
  );
};

export const withLanguagePendingTranslation = (i18n, object, path) => {
  if (get(object, `${path}_zh`) && !get(object, `${path}_zh`)) {
    return `[Pending Translation] ${get(object, `${path}_${i18n.language}`)}`;
  }
  return (
    get(object, `${path}_${i18n.language}`) || get(object, `${path}_zh`) || ''
  );
};

export const getLocalizedPath = (i18n, path) => {
  return removePathTrailingSlash(i18n.language === 'en' ? `/en${path}` : path);
};

export const withKeyAndLanguage = (
  i18n,
  object,
  path,
  checkPendingTranslation = false
) => {
  const item = object.edges.find(e => e.node.key === path);
  if (!item) {
    return '';
  }
  return withLanguage(i18n, item.node, 'text', checkPendingTranslation);
};

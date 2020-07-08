import _get from "lodash.get"

export const withLanguage = (
  i18n,
  object,
  path
) => {

  const lang = i18n.language.replace('-', '_');
  return (
    _get(object, `${path}_${lang}`) || ""
  )
}
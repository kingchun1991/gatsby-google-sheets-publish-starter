export const isSSR = () => typeof window === 'undefined';

export function openInNewTab(url) {
  const win = window.open(url, '_blank');
  win.focus();
}

export const saveToLocalStorage = (key, value) => {
  if (typeof Storage !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
};

export const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const handleVideoUrl = ({ assetId, type, thumbnailUrl }) => {
  let videoUrl;
  let imgUrl;
  switch (type) {
    case 'facebook':
      videoUrl = `https://www.facebook.com/watch/?v=${assetId}`;
      imgUrl = thumbnailUrl;
      break;
    case 'youtube':
    default:
      videoUrl = `https://www.youtube.com/watch?v=${assetId}`;
      imgUrl = `https://i.ytimg.com/vi/${assetId}/hqdefault.jpg`;
      break;
  }
  return {
    videoUrl,
    imgUrl,
  };
};



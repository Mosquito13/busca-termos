const releaseUtils = {
  parseLastRelease(releases) {
    if (!releases || releases?.data?.length < 1) {
      return [];
    }

    const { tag_name, html_url } = releases.data[0];

    return [tag_name, html_url];
  },

  hasUpdate(currentVersion, latestVersion) {
    if (!latestVersion) {
      return false;
    }

    const [curMajor, curMinor, curPatch] = currentVersion.split('.');
    const [latMajor, latMinor, latPatch] = latestVersion.split('.');

    if (curMajor < latMajor) return true;
    if (curMinor < latMinor) return true;
    if (curPatch < latPatch) return true;

    return false;
  }
};

export default releaseUtils;

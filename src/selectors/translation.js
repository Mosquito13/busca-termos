const getSlice = (state) => state.Translation;

const translationSelectors = {
  getTranslation(state, id) {
    return getSlice(state)?.[id] || '';
  }
};

export default translationSelectors;

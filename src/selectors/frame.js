const getSlice = (state) => state.Frame;

const frameSelectors = {
  isMaximized(state) {
    return getSlice(state).maximized;
  }
};

export default frameSelectors;

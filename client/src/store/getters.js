const getters = {
  sidebar: state => state.app.sidebar,
  isMobile: state => state.app.isMobile,
  // language: state => state.app.language,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token
}
export default getters

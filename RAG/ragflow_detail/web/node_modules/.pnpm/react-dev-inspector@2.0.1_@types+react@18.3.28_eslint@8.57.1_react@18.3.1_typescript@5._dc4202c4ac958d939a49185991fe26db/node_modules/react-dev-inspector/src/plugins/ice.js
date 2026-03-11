import { launchEditorMiddleware } from '@react-dev-inspector/middleware'

/**
 * legacy plugin for Ice.js v2
 * copy code from `react-dev-inspector@v1/src/plugins/ice/index.ts`
 */
export default ({ onGetWebpackConfig }) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  onGetWebpackConfig((config) => {
    // add webpack dev server middleware for launch IDE app with api request
    const originalDevServeBefore = config.devServer.get('before')
    config.merge({
      devServer: {
        before(app, server) {
          app.get('*', launchEditorMiddleware)
          if (typeof originalDevServeBefore === 'function') {
            originalDevServeBefore(app, server)
          }
        },
      },
    })
  })
}

const util = require('util')
const {
  bold,
  red,
  yellow,
  green,
} = require('picocolors')


const showDeprecated = util.deprecate(() => {}, `

  You are required to use the legacy ${yellow("'react-dev-inspector/plugins/webpack'")}, which has been ${bold(red('deprecated'))} since v2.0,
  the ability was split into two parts, please install and change to use them:
    - Source Loader with babel -> ${green("'@react-dev-inspector/babel-plugin'")}
    - Middleware for dev server -> ${green("'@react-dev-inspector/middleware'")}

  Migration guide see: https://react-dev-inspector.zthxxx.me/docs/migrate-v1-to-v2
  Middleware docs see: https://react-dev-inspector.zthxxx.me/docs/integration#inspector-middleware
  Babel plugin docs: https://react-dev-inspector.zthxxx.me/docs/compiler-plugin

`)

showDeprecated()

module.exports = require('@react-dev-inspector/middleware')

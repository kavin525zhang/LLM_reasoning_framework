const util = require('util')
const {
  bold,
  red,
  yellow,
  green,
} = require('picocolors')


const showDeprecated = util.deprecate(() => {}, `

  You are required to use the legacy ${yellow("'react-dev-inspector/plugins/vite'")}, which has been ${bold(red('deprecated'))} since v2.0.
  Please install and change to use the ${green("'@react-dev-inspector/vite-plugin'")} instead.

  Migration guide see: https://react-dev-inspector.zthxxx.me/docs/migrate-v1-to-v2

`)

showDeprecated()

module.exports = require('@react-dev-inspector/vite-plugin')

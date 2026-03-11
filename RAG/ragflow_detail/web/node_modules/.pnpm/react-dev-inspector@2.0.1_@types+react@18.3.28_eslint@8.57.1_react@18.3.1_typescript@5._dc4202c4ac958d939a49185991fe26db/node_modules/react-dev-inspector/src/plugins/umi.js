const util = require('util')
const {
  bold,
  red,
  yellow,
  green,
} = require('picocolors')


const showDeprecated = util.deprecate(() => {}, `

  You are required to use the legacy ${yellow("'react-dev-inspector/plugins/umi'")}, which has been ${bold(red('deprecated'))} since v2.0.
  Please install and change to use the ${green("'@react-dev-inspector/umi4-plugin'")} or ${green("'@react-dev-inspector/umi3-plugin'")} instead.

  Migration guide see: https://react-dev-inspector.zthxxx.me/docs/migrate-v1-to-v2

`)

showDeprecated()

/**
 * @type {import('umi').IApi} api
 */
module.exports = (api) => {
  // https://umijs.org/docs/api/plugin-api#addbeforebabelplugins
  if (api.addBeforeBabelPlugins) {
    // umi4
    const plugin = require('@react-dev-inspector/umi4-plugin')
    plugin(api)
  }
  else {
    // umi3
    const plugin = require('@react-dev-inspector/umi3-plugin')
    plugin(api)
  }
}

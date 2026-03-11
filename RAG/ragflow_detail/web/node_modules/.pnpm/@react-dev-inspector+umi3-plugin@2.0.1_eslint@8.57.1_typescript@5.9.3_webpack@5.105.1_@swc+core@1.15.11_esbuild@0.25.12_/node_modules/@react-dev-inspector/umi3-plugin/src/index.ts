/**
 * preset plugins for umi3
 */

import type { IApi, RequestHandler } from '@umijs/types'
import {
  launchEditorMiddleware,
} from '@react-dev-inspector/middleware'
import type { InspectorPluginOptions } from '@react-dev-inspector/babel-plugin'

export interface UmiInspectorPluginOptions extends InspectorPluginOptions {
  /**
   * whether to add the optional `@react-dev-inspector/babel-plugin` to umi
   * @default `true` in development, `false` in production
   */
  enableBabelPlugin?: boolean;
}

export default function inspectorPlugin(api: IApi) {
  const inspectorConfig = api.userConfig.inspectorConfig as UmiInspectorPluginOptions | undefined

  api.describe({
    key: 'inspectorConfig',
    config: {
      schema(joi) {
        return joi.object()
      },
    },
    enableBy: api.EnableBy.register,
  })

  const enableBabelPlugin = inspectorConfig?.enableBabelPlugin
    ?? (process.env.NODE_ENV === 'development')

  if (enableBabelPlugin) {
    api.modifyBabelOpts((babelOptions) => {
      babelOptions.plugins.unshift([
        require.resolve('@react-dev-inspector/babel-plugin'),
        {
          cwd: inspectorConfig?.cwd,
          excludes: [
            /\.umi(-production)?\//,
            ...inspectorConfig?.excludes ?? [],
          ],
        },
      ])
      return babelOptions
    })
  }

  const createMiddleware = () => launchEditorMiddleware as RequestHandler<any>

  /**
   * due to umi3 not use webpack devServer,
   * so need add launch editor middleware manually
   */
  api.addBeforeMiddlewares
    ? api.addBeforeMiddlewares(createMiddleware)
    // typo of umi3 legacy api
    : api.addBeforeMiddewares(createMiddleware)
}

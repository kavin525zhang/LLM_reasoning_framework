/**
 * preset plugins for umi4
 */

import type { IApi } from 'umi'
import {
  createLaunchEditorMiddleware,
} from '@react-dev-inspector/middleware'
import type { InspectorPluginOptions } from '@react-dev-inspector/babel-plugin'

export interface UmiInspectorPluginOptions extends InspectorPluginOptions {
  /**
   * whether to add the optional `@react-dev-inspector/babel-plugin` to umi
   * @default `true` in development AND `srcTranspiler` is `babel` , `false` in production
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
    ?? (
      process.env.NODE_ENV === 'development'
      && (api.config.srcTranspiler ?? 'babel') === 'babel'
    )

  if (enableBabelPlugin) {
    // https://umijs.org/docs/api/plugin-api#addbeforebabelplugins
    api.addBeforeBabelPlugins(() => [
      [
        require.resolve('@react-dev-inspector/babel-plugin'),
        {
          cwd: inspectorConfig?.cwd,
          excludes: [
            /\.umi(-production)?\//,
            ...inspectorConfig?.excludes ?? [],
          ],
        },
      ],
    ])
  }

  // https://umijs.org/docs/api/plugin-api#addbeforemiddlewares
  api.addBeforeMiddlewares(createLaunchEditorMiddleware)
}

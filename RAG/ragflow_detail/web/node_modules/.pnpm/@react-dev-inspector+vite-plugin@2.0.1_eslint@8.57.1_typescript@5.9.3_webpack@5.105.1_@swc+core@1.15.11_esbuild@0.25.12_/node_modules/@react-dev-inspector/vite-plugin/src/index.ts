import type { Plugin } from 'vite'
import { launchEditorMiddleware } from '@react-dev-inspector/middleware'

export const inspectorServer = (): Plugin => ({
  name: 'inspector-server-plugin',
  configureServer(server) {
    server.middlewares.use(launchEditorMiddleware)
  },
})

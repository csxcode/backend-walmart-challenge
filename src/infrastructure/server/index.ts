import {Server} from 'http'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from '@koa/cors'
import {errorHandler} from './middlewares/error-handler'
import {InversifyKoaServer} from 'inversify-koa-utils'
import {DIContainer} from './ioc/inversify.config'

interface WebServerOptions {
  port: number
}

export function loadWebServer(options: WebServerOptions) {
  const server = new InversifyKoaServer(
    new DIContainer().container,    
  );

  server.setConfig((app)=>{
    app.use(errorHandler)
    app.use(cors())
    app.use(bodyparser())
    app.use(logger())
  });

  let runningServer: Server | undefined = undefined
  return {
    start: () => {
      runningServer = server.build().listen(options.port, () =>
        console.log(`- Web server started on PORT: ${options.port}`),
      )
    },
    close: () => {
      runningServer?.close()
      console.log('- Closed web server')
    },
  }
}

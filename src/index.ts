import 'reflect-metadata';
import {loadConfig} from './infrastructure/config'
import {loadWebServer} from './infrastructure/server'
import {loadDBConnection} from './infrastructure/db/mongodb'

async function main() {
  const appConfig = loadConfig()
  const dbModule = loadDBConnection(appConfig)
  const webServerModule = loadWebServer({port: appConfig.SERVER_PORT})

  await dbModule.start()
  webServerModule.start()

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']
  signals.forEach(s =>
    process.once(s, async () => {
      console.log('...Closing App...')
      webServerModule.close()
      await dbModule.close()
      console.log('...App Closed...')
    }),
  )

  const errorTypes = ['unhandledRejection', 'uncaughtException']
  errorTypes.map(type => {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`)
        console.error(e)
        webServerModule.close()
        await dbModule.close()
        process.exit(0)
      } catch (_) {
        process.exit(1)
      }
    })
  })
}

main()

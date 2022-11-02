// set NODE_ENV manually
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

import config from 'config'
import type { Application, NextFunction, Request, Response } from 'express'
import app from './src/app'
import domains from './src/app/domains'
import utils from './src/app/shared/utils'

type StartServer = { port: number; app: Application }

/**
 *
 * @param app
 */
const startServer = async ({ app, port }: StartServer) => {
  try {
    console.log(`--------------------------------------------------`)

    const startDatabase = (await import('./src/db')).startDatabase
    const isSuccess = await startDatabase()

    if (!isSuccess) throw new Error('+++ Database failed +++')

    // TODO: make this more reliable and log to file/db
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      req.log.error(err)
    })

    app.listen(port, () => {
      console.log(`[SERVER]: ⚡ Running on port ${port}`)
      console.log(`   [ENV]: 🌎 ${process.env.NODE_ENV}`)
      console.log(`--------------------------------------------------`)
    })
  } catch (error: any) {
    const err = utils.handleErrors(error)
    console.error(err)
  }
}

startServer({
  port: config.get<number>('app.port'),
  app: app({
    middleware: {
      pinoHttp: {
        nestedKey: 'log',
        quietReqLogger: true,
        autoLogging: false,
        transport: {
          target: 'pino-pretty',
          options: { colorize: true },
        },
      },
      json: { type: 'application/json' },
      urlencoded: { extended: true },
      cors: undefined,
    },
    router: {
      version: 'v1',
      prefix: 'api',
      routers: Object.values(domains).map(domain => domain.router),
    },
  }),
})

import type { OptionsJson, OptionsUrlencoded } from 'body-parser'
import type { CorsOptions } from 'cors'
import cors from 'cors'
import dotenv from 'dotenv'
import type { Application, Router } from 'express'
import express from 'express'
import helmet from 'helmet'
import type { Options } from 'pino-http'
import PinoHttp from 'pino-http'
import 'reflect-metadata'

interface BootstrapGlobalMiddlewareConfig {
  pinoHttp?: Options
  json?: OptionsJson
  urlencoded?: OptionsUrlencoded
  cors?: CorsOptions
}

interface BootstrapRouterConfig {
  version: 'v1'
  routers: Router[]
  prefix?: string
}

interface CustomAppConfig {
  middleware: BootstrapGlobalMiddlewareConfig
  router: BootstrapRouterConfig
}

/**
 *
 * @param app
 * @param opts
 * @returns
 */
const bootstrapGlobalMiddleware = (
  app: Application,
  opts: BootstrapGlobalMiddlewareConfig,
) => {
  // global middleware
  dotenv.config()
  app.use(express.json(opts.json))
  app.use(express.urlencoded(opts.urlencoded))
  app.use(cors())
  app.use(helmet())
  app.disable('x-powered-by')
  app.use(PinoHttp(opts.pinoHttp))

  return app
}

/**
 *
 * @param app
 * @param param1
 * @returns
 */
const bootstrapRouter = (
  app: Application,
  { prefix, version, routers }: BootstrapRouterConfig,
) => {
  if (prefix) prefix = `/${prefix}`
  const path = `${prefix}/${version}`

  app.use(path, routers)

  return app
}

/**
 *
 * @param config
 * @returns
 */
export default function app(config: CustomAppConfig) {
  const app = express()

  bootstrapGlobalMiddleware(app, config.middleware)
  bootstrapRouter(app, config.router)

  return app
}

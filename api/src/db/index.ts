import utils from '../app/shared/utils'
import { initTypeORM } from './typeorm'

export const startDatabase = async () => {
  try {
    console.log(`    [DB]: 🌌 Connecting to database`)
    await initTypeORM()
    console.log(`    [DB]: 🌌 Database connected`)

    return true
  } catch (error: any) {
    throw utils.handleErrors(error)
  }
}

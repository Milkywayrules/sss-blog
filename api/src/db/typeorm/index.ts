import utils from '../../app/shared/utils'
import { AppDataSource } from './data-source'

export const initTypeORM = async () => {
  try {
    console.log(`    [DB]: 🔰 Initiating TypeORM`)
    await AppDataSource.initialize()
    console.log(`    [DB]: 🔰 TypeORM initiated`)

    return true
  } catch (error) {
    throw utils.handleErrors(error)
  }
}

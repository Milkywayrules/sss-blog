import { AppDataSource } from '../../../db/typeorm/data-source'
import { apiResponse } from '../../shared/utils/api-response'
import userController from './user.controller'
import { User } from './User.entity'
import UserRepository from './user.repository'
import userRoutes from './user.routes'
import UserService from './user.service'

const repo = new UserRepository(User, AppDataSource)
const service = new UserService(repo)

// yeaa idk why only controller that error when using class and inject a service
// i do the same approach on previous project and it was smoot af. loool
const controller = userController(service, apiResponse)

const user = {
  controller: controller,
  repoository: repo,
  service: service,
  router: userRoutes(controller),
}

export default user

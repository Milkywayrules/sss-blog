import { Router } from 'express'
import { UserController } from './user.controller'

// const userController = new UserController()

/**
 * Endpoint list:
 * - /              : Get many            [GET]
 * - /              : Store one           [POST]
 *
 * - /:id           : Get one             [GET]
 * - /:id           : Update one          [PATCH]
 * - /:id           : Delete one          [DELETE]
 */
const userRoutes = (prefix: string, router: Router, c: UserController) => {
  router.get(`${prefix}`, c.getMany)

  router.post(`${prefix}`, c.store)

  router.get(`${prefix}/:id`, c.getOne)

  router.patch(`${prefix}/:id`, c.patch)

  router.delete(`${prefix}/:id`, c.remove)

  return router
}

export default (controller: UserController) =>
  userRoutes('/users', Router(), controller)

// example w schema checking
//    .post(checkSchema(storeUserSchema), validateSchema, UsersController.store) // store a new one

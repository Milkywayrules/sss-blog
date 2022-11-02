import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ApiResponseFn } from '../../shared/utils/api-response'
import UserService from './user.service'

export default function userController(
  userService: UserService,
  apiResponse: ApiResponseFn,
) {
  return {
    async getMany(_: Request, res: Response, next: NextFunction) {
      try {
        const users = await userService.list()

        apiResponse(res, {
          statusCode: StatusCodes.OK,
          statusMessage: 'List of user(s).',
          payload: users,
        })
      } catch (err) {
        console.error('///', err)
        next()
      }
    },

    async getOne(req: Request, res: Response, next: NextFunction) {
      try {
        const user = await userService.show(req.params.id)

        apiResponse(res, {
          statusCode: StatusCodes.OK,
          statusMessage: 'Detail of user.',
          payload: user,
        })
      } catch (err) {
        console.error('///', err)
        next()
      }
    },

    async store(req: Request, res: Response, next: NextFunction) {
      try {
        console.log(req.body)

        const newUser = await userService.insertOne(req.body)

        apiResponse(res, {
          statusCode: StatusCodes.CREATED,
          statusMessage: 'User created.',
          payload: newUser,
        })
      } catch (err) {
        console.error('///', err)
        next()
      }
    },

    patch(_: Request, res: Response) {
      console.log('UserController.patch')
      return res.send('UserController.patch')
    },

    remove(_: Request, res: Response) {
      console.log('UserController.remove')
      return res.send('UserController.remove')
    },
  }
}

export type UserController = ReturnType<typeof userController>

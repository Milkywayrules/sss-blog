import type { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

interface BaseResponse {
  statusCode: StatusCodes
  statusMessage: string
}

interface APISuccess<T> extends BaseResponse {
  payload: T
}

interface APIError extends BaseResponse {
  error: Error | string
}

export type APIResponse<T> = APISuccess<T> | APIError

export const apiResponse = <T>(
  res: Response,
  resObj: APIResponse<T>,
): Response => {
  return res.status(resObj.statusCode).json(resObj)
}

export type ApiResponseFn = typeof apiResponse

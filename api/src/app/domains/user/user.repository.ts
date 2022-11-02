import { AppDataSource } from '../../../db/typeorm/data-source'
import { User } from './User.entity'

type Model = typeof User
type AppDataSource = typeof AppDataSource
type Repo = ReturnType<AppDataSource['getRepository']>

export default class UserRepository {
  private _User: Model
  private _userRepo: Repo

  constructor(model: Model, appDataSource: AppDataSource) {
    this._User = model
    this._userRepo = appDataSource.getRepository(model)
  }

  public findAll() {
    return this._userRepo.find()
  }

  public findByID(id: string) {
    return this._userRepo.findOneBy({ id })
  }

  public async insertOne(user: User) {
    const u = new this._User()
    u.firstName = user.firstName
    u.lastName = user.lastName
    u.age = user.age
    const res = await this._userRepo.save(u)

    return res
  }
}

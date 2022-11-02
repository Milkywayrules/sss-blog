import { User } from './User.entity'
import UserRepository from './user.repository'

export default class UserService {
  userRepo: UserRepository

  constructor(repo: UserRepository) {
    this.userRepo = repo
  }

  public async list() {
    return await this.userRepo.findAll()
  }

  public async show(id: string) {
    return await this.userRepo.findByID(id)
  }

  public async insertOne(user: User) {
    return await this.userRepo.insertOne(user)
  }
}

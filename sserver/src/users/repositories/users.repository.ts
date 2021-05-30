import { EntityRepository, getConnection, Repository } from 'typeorm'

import { User, UserRole } from '../entities'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(data: {
    username: string
    password: string
    firstName: string
    lastName: string
  }) {
    const { username, password, firstName, lastName } = data

    await getConnection().transaction(async transactionalEntityManager => {
      const newUser = await transactionalEntityManager
        .getRepository(User)
        .save({
          username,
          password,
          firstName,
          lastName
        })

      await transactionalEntityManager.getRepository(UserRole).save({
        user: { id: newUser.id },
        role: { id: 1 }
      })
    })
  }

  async findOneWithRoles(options: {
    where: {
      username: string
    }
  }) {
    return this.createQueryBuilder('u')
      .innerJoinAndSelect('u.usersRoles', 'ur')
      .innerJoinAndSelect('ur.role', 'r')
      .where('u.username = :username', { username: options.where.username })
      .getOne()
  }
}

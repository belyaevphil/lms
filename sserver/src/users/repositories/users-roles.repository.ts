import { EntityRepository, Repository } from 'typeorm'

import { UserRole } from '../entities'

@EntityRepository(UserRole)
export class UsersRolesRepository extends Repository<UserRole> {}

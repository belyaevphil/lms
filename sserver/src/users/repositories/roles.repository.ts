import { EntityRepository, Repository } from 'typeorm'

import { Role } from '../entities'

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {}

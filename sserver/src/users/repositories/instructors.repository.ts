import { EntityRepository, Repository } from 'typeorm'

import { Instructor } from '../entities'

@EntityRepository(Instructor)
export class InstructorsRepository extends Repository<Instructor> {}

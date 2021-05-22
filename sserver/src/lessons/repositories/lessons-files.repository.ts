import { EntityRepository, Repository } from 'typeorm'

import { LessonFile } from '../entities/lessons-files.entity'

@EntityRepository(LessonFile)
export class LessonsFilesRepository extends Repository<LessonFile> {}

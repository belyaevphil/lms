import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'
import {
  LessonsFilesRepository,
  LessonsRepository,
  StudentsLessonsRepository
} from './repositories'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonsRepository,
      StudentsLessonsRepository,
      LessonsFilesRepository
    ])
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [TypeOrmModule]
})
export class LessonsModule {}

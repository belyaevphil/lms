import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from 'src/users/users.module'
import { CoursesController } from './courses.controller'
import { CoursesService } from './courses.service'
import { LessonsModule } from 'src/lessons/lessons.module'
import { CoursesRepository, StudentsCoursesRepository } from './repositories'

@Module({
  imports: [
    TypeOrmModule.forFeature([CoursesRepository, StudentsCoursesRepository]),
    UsersModule,
    LessonsModule
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [TypeOrmModule]
})
export class CoursesModule {}

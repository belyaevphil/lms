import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from 'src/auth/auth.module'
import { CoursesModule } from 'src/courses/courses.module'
import { LessonsModule } from 'src/lessons/lessons.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tester',
      password: 'tester',
      database: 'testdb',
      autoLoadEntities: true,
      logging: true
    }),
    AuthModule,
    CoursesModule,
    LessonsModule,
    UsersModule
  ]
})
export class AppModule {}

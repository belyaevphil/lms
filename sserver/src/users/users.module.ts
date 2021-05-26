import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  UsersRepository,
  InstructorsRepository,
  RolesRepository,
  UsersRolesRepository
} from './repositories'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      InstructorsRepository,
      RolesRepository,
      UsersRolesRepository
    ])
  ],
  exports: [TypeOrmModule]
})
export class UsersModule {}

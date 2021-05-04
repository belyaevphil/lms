import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash, compare } from 'bcrypt'

import { UsersRepository } from 'src/users/repositories'
import { SignInDto, SignUpDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async signUp(data: SignUpDto) {
    const { username, password, repeatPassword, firstName, lastName } = data

    if (password !== repeatPassword) {
      throw new BadRequestException('Пароли не совпадают')
    }
    const candidate = await this.usersRepository.findOne({
      where: { username }
    })
    if (candidate) {
      throw new BadRequestException('Имя пользователя занято')
    }

    const hashedPassword = await hash(password, 10)

    await this.usersRepository.createUser({
      username,
      password: hashedPassword,
      firstName,
      lastName
    })
  }

  async signIn(data: SignInDto) {
    const { username, password } = data

    const user = await this.usersRepository.findOneWithRoles({
      where: { username }
    })
    if (!user) {
      throw new BadRequestException('Неверный e-mail адрес или пароль')
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new BadRequestException('Неверный e-mail адрес или пароль')
    }

    const userData = {
      id: user.id,
      roles: user.usersRoles.map(userRole => userRole.role.name),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    }

    return userData
  }
}

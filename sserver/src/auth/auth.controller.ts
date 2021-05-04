import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  Session,
  UseGuards
} from '@nestjs/common'
import { Session as ExpressSession } from 'express-session'

import { AuthService } from './auth.service'
import { SignUpDto, SignInDto } from './dto'
import { validationSchemas, ValidationPipe } from 'src/validation'
import { Roles } from 'src/security/roles.decorator'
import { RolesGuard } from 'src/security/roles.guard'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign/up')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe(validationSchemas.auth.signUp))
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto)

    return {
      status: 'success',
      payload: null,
      message: 'Вы успешно прошли регистрацию'
    }
  }

  @Post('/sign/in')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe(validationSchemas.auth.signIn))
  async signIn(
    @Body() signInDto: SignInDto,
    @Session() session: ExpressSession
  ) {
    const userData = await this.authService.signIn(signInDto)

    session.userData = userData

    return {
      status: 'success',
      payload: {
        userData
      },
      message: null
    }
  }

  @Post('/sign/out')
  @HttpCode(HttpStatus.OK)
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  async signOut(@Session() session: ExpressSession) {
    session.destroy(err => console.log(err))

    return {
      status: 'success',
      payload: null,
      message: 'Вы успешно вышли из своего аккаунта'
    }
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  async authData(@Session() session: ExpressSession) {
    const userData = session.userData

    return {
      status: 'success',
      payload: {
        userData
      },
      message: null
    }
  }
}

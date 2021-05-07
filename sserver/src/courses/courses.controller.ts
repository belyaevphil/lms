import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Session,
  UseGuards,
  UsePipes
} from '@nestjs/common'
import { Session as ExpressSession } from 'express-session'

import { Roles } from 'src/security/roles.decorator'
import { RolesGuard } from 'src/security/roles.guard'
import { validationSchemas, ValidationPipe } from 'src/validation'
import { CoursesService } from './courses.service'
import { AssignCourseDto, CreateCourseDto, AssignInstructorDto } from './dto'

@Controller('/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/assign/instructor')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe(validationSchemas.course.assignInstructor))
  async assignInstructor(@Body() assignInstructorDto: AssignInstructorDto) {
    await this.coursesService.assignInstructor(assignInstructorDto)

    return {
      status: 'success',
      payload: null,
      message: 'Роль была назначена успешно'
    }
  }

  @Post('/assign')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe(validationSchemas.course.assign))
  async assignCourse(@Body() assignCourseDto: AssignCourseDto) {
    await this.coursesService.assign(assignCourseDto)

    return {
      status: 'success',
      payload: null,
      message: 'Курс назначен успешно'
    }
  }

  @Get('/instructor/:id')
  @HttpCode(HttpStatus.OK)
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  async getInstructorCourse(@Param('id') courseId: number) {
    const instructorCourse = await this.coursesService.getInstructorCourse({
      courseId
    })

    return {
      status: 'success',
      payload: {
        instructorCourse
      },
      message: null
    }
  }

  @Get('/instructor')
  @HttpCode(HttpStatus.OK)
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  async getInstructorCourses(@Session() session: ExpressSession) {
    const courses = await this.coursesService.getInstructorCourses({
      userId: session.userData.id
    })

    return {
      status: 'success',
      payload: {
        courses
      },
      message: null
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  async getOne(
    @Param('id') courseId: number,
    @Session() session: ExpressSession
  ) {
    const courseData = await this.coursesService.getOneById({
      courseId,
      userId: session.userData.id
    })

    return {
      status: 'success',
      payload: {
        courseData
      },
      message: null
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  async getManyByUserId(@Session() session: ExpressSession) {
    const courses = await this.coursesService.getManyByUserId({
      userId: session.userData.id
    })

    return {
      status: 'success',
      payload: {
        courses
      },
      message: null
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe(validationSchemas.course.create))
  async create(@Body() createCourseDto: CreateCourseDto) {
    await this.coursesService.create(createCourseDto)

    return {
      status: 'success',
      payload: null,
      message: 'Курс был создан успешно'
    }
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Session
} from '@nestjs/common'
import { Session as ExpressSession } from 'express-session'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { diskStorage } from 'multer'
import { v4 as generateUuid } from 'uuid'

import { AddAnswerDto, CreateLessonDto, GradeAnswerDto } from './dto'
import { LessonsService } from './lessons.service'
import { validationSchemas, ValidationPipe } from 'src/validation'
import { Roles } from 'src/security/roles.decorator'
import { RolesGuard } from 'src/security/roles.guard'

const localMulterOptions = {
  storage: diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/lessonsFiles')
    },
    filename: function(req, file, cb) {
      cb(null, generateUuid() + file.originalname)
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 3
  }
}

@Controller('/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get('/download/file')
  @HttpCode(HttpStatus.OK)
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  async downloadFile(
    @Query('path') path: string,
    @Query('name') name: string,
    @Res() response: Response
  ) {
    return response.download(path, name)
  }

  @Get('/instructor/grade/:id')
  @HttpCode(HttpStatus.OK)
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  async getInstructorLessonToGrade(@Param('id') id: number) {
    const lesson = await this.lessonsService.getInstructorLessonToGrade({
      lessonId: id
    })

    return {
      status: 'success',
      payload: {
        lesson
      },
      message: null
    }
  }

  @Get('/instructor/grade')
  @HttpCode(HttpStatus.OK)
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  async getInstructorLessonsToGrade(@Session() session: ExpressSession) {
    const lessons = await this.lessonsService.getInstructorLessonsToGrade({
      userId: session.userData.id
    })

    return {
      status: 'success',
      payload: {
        lessons
      },
      message: null
    }
  }

  @Get('/instructor/:id')
  @HttpCode(HttpStatus.OK)
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  async getInstructorLesson(@Param('id') id: number) {
    const lesson = await this.lessonsService.getInstructorLesson({
      lessonId: id
    })

    return {
      status: 'success',
      payload: {
        lesson
      },
      message: null
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  async getOne(@Param('id') id: number) {
    const lessonData = await this.lessonsService.getOneById({
      lessonId: id,
      userId: 9
    })

    return {
      status: 'success',
      payload: {
        lessonData
      },
      message: null
    }
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  async update(@Param('id') id: number) {
    await this.lessonsService.update({
      lessonId: id,
      userId: 9
    })

    return {
      status: 'success',
      payload: null,
      message: 'Урок был обновлен успешно'
    }
  }

  @Post('/answer')
  @HttpCode(HttpStatus.CREATED)
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe(validationSchemas.lesson.addAnswer))
  async addAnswer(@Body() addAnswerDto: AddAnswerDto) {
    await this.lessonsService.addAnswer(addAnswerDto)

    return {
      status: 'success',
      payload: null,
      message: 'Ответ был добавлен успешно'
    }
  }

  @Post('/grade')
  @HttpCode(HttpStatus.OK)
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe(validationSchemas.lesson.grade))
  async gradeAnswer(@Body() gradeAnswerDto: GradeAnswerDto) {
    await this.lessonsService.gradeAnswer(gradeAnswerDto)

    return {
      status: 'success',
      payload: null,
      message: 'Оценка была выставлена успешно'
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Roles('INSTRUCTOR')
  @UseGuards(RolesGuard)
  @UseInterceptors(FilesInterceptor('files', 3, localMulterOptions))
  @UsePipes(new ValidationPipe(validationSchemas.lesson.create))
  async create(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    await this.lessonsService.create({ ...createLessonDto, files })

    return {
      status: 'success',
      payload: null,
      message: 'Урок был создан успешно'
    }
  }
}

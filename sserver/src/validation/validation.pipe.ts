import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import * as yup from 'yup'

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: yup.AnyObjectSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value)
      return value
    } catch (e) {
      throw new BadRequestException(e.errors[0])
    }
  }
}

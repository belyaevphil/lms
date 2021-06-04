import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import * as redis from 'redis'

import { AppModule } from './app/app.module'
import { AllExceptionsFilter } from './exceptions/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const redisClient = redis.createClient()
  redisClient.on('ready', () => {
    console.log('redis is running')
  })
  redisClient.on('error', () => {
    console.error('redis error')
    process.exit(0)
  })
  const RedisStore = connectRedis(session)

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })
  app.setGlobalPrefix('/api')
  app.use(helmet())
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      name: 'SID',
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 15
      }
    })
  )
  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(5000)
}
bootstrap()

import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { User } from '../models/user.schema';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { UserService } from './user.service';
import { ValidationService } from './validation.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: User }])],
  providers: [
    UserService,
    ValidationService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [UserService, ValidationService],
})
export class SharedModule {}

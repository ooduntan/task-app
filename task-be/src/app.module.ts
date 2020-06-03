import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';

import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MorganModule.forRoot(),
    TaskModule,
    DatabaseModule
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: MorganInterceptor('dev'),
  }],
})
export class AppModule { }

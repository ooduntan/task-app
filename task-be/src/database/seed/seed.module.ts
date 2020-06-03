import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from '@nestjs/config';

import { SeederService } from './seed.service'
import { TaskEntity } from '../../task/task.entity'
import { TaskModule } from '../../task/task.module'


/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, TypeOrmModule.forFeature([TaskEntity]), TaskModule],
  providers: [SeederService],
})
export class SeederModule { }

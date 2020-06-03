import { Module } from "@nestjs/common";
import { TaskController } from './task.controller';
import { TaskService } from './task.service'
import { TaskEntity } from './task.entity'
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  exports: [TaskService],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})

export class TaskModule { }
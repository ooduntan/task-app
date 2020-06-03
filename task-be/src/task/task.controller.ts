import { Controller, Get, Param, Delete, Patch, Post, Body, Query, ParseIntPipe } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDTO } from './interfaces/createTaskDTO'
import { TaskEntity } from './task.entity'
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  async getResentTask(@Query('skip') skip: number, @Query('take') take: number): Promise<[TaskEntity[], number]> {
    return this.taskService.resentTask(skip, take);
  }

  @Post()
  async createNewTask(@Body() newTask: CreateTaskDTO): Promise<TaskEntity> {
    return this.taskService.createTask(newTask)
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId', ParseIntPipe) taskId: string): Promise<DeleteResult> {
    return this.taskService.deleteTask(taskId);
  }

  @Patch(':taskId')
  editTask(@Param('taskId', ParseIntPipe) taskId: string, @Body() newTaskData: CreateTaskDTO): Promise<UpdateResult> {
    return this.taskService.editTask(taskId, newTaskData);
  }
}
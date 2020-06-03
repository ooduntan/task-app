import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TaskService } from '../../task/task.service'
import taskSeed from './tasks.seed'

@Injectable()
export class SeederService {
  constructor(
    private readonly taskService: TaskService,
  ) { }

  async seed() {
    await this.tasks()
      .then(completed => {
        console.log('Successfully completed seeding tasks...');
        Promise.resolve(completed);
      })
      .catch(error => {
        console.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async tasks() {
    const exitingTask = await this.taskService.resentTask(0, 1);
    if (exitingTask.length) {
      throw new Error("Task already exists");
    }

    return await Promise.all(taskSeed.map(task =>
      this.taskService.createTask(task).then(createdTask => {
        console.log('Created new task', createdTask)
        return Promise.resolve(true);
      }).catch(error => Promise.reject(error))
    ))
  }
}


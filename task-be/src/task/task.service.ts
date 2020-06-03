import { Injectable } from "@nestjs/common";
import { CreateTaskDTO } from "./interfaces/createTaskDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./task.entity";
import { Repository, DeleteResult, UpdateResult } from "typeorm";

@Injectable()
export class TaskService {
  constructor(@InjectRepository(TaskEntity) private taskRepository: Repository<TaskEntity>) { }

  async resentTask(skip = 0, take = 10): Promise<[TaskEntity[], number]> {
    return this.taskRepository.findAndCount({
      skip, take, order: {
        createdAt: 'DESC'
      }
    });
  }

  async deleteTask(taskId: string): Promise<DeleteResult> {
    const { id } = await this.taskRepository.findOneOrFail(taskId)
    return this.taskRepository.delete(id)
  }

  async editTask(taskId: string, newTaskData: CreateTaskDTO): Promise<UpdateResult> {
    await this.taskRepository.findOneOrFail(taskId)
    return this.taskRepository.update(taskId, newTaskData)
  }

  createTask(newTask: CreateTaskDTO): Promise<CreateTaskDTO & TaskEntity> {
    return this.taskRepository.save(newTask)
  }
}
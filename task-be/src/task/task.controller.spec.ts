import { Test } from '@nestjs/testing';

import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import { Repository, DeleteResult, UpdateResult } from "typeorm";

import { DatabaseModule } from '../database/database.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskEntity } from './task.entity';
import { CreateTaskDTO } from './interfaces/createTaskDTO';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  const testTask = new TaskEntity();
  let repo: Repository<TaskEntity>
  const time = new Date()
  const taskData = {
    title: 'title',
    id: 1,
    description: 'description',
    createdAt: time,
    updatedAt: time,
    isCompleted: false,
    isEnabled: true
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TaskController],
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([TaskEntity]),
        ConfigModule.forRoot({ isGlobal: true })
      ],
      providers: [TaskService, Repository],
    }).compile();

    taskService = moduleRef.get<TaskService>(TaskService);
    repo = moduleRef.get<Repository<TaskEntity>>(Repository)
    taskController = moduleRef.get<TaskController>(TaskController);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('Task Controller', () => {
    it('Should return an array of task and total numbers of task', async () => {
      // Prepare
      const skip = 1;
      const take = 1;
      const mockResponse = new Promise<[TaskEntity[], number]>((resolve, reject) =>
        resolve([[taskData], 1]))
      jest.spyOn(taskService, 'resentTask').mockImplementation(async () => mockResponse);
      const expectedResult = [[taskData], 1]

      // Act
      const r = await taskController.getResentTask(skip, take);

      // Assert
      expect(r).toHaveLength(2);
      expect(taskService.resentTask).toBeCalledTimes(1);
      expect(r).toEqual(expectedResult);

    });

    it('Should return new created task', async () => {
      // Prepare
      const mockResponse = new Promise<CreateTaskDTO & TaskEntity>((resolve, reject) => resolve(taskData))
      const newTask = { ...taskData }
      jest.spyOn(taskService, 'createTask').mockImplementation(async () => mockResponse);
      const expectedResult = taskData

      // Act
      const r = await taskController.createNewTask(newTask);

      // Assert
      expect(taskService.createTask).toBeCalledTimes(1);
      expect(r).toEqual(expectedResult);
    });

    it('Should return deleted task', async () => {
      // Prepare
      const deletedResult = { raw: [], affected: 1}
      const mockResponse = new Promise<DeleteResult>((resolve, reject) => resolve(deletedResult))
      const taskId = '1'
      jest.spyOn(taskService, 'deleteTask').mockImplementation(async () => mockResponse);
      const expectedResult = { ...deletedResult }

      // Act
      const r = await taskController.deleteTask(taskId);

      // Assert
      expect(taskService.deleteTask).toBeCalledTimes(1);
      expect(r).toEqual(expectedResult);
    });

    it('Should return editTask task', async () => {
      // Prepare
      const updatedResult = { raw: [], affected: 1, generatedMaps: [] }
      const mockResponse = new Promise<UpdateResult>((resolve, reject) => resolve(updatedResult))
      const findOneOrFail = new Promise<TaskEntity>((resolve, reject) => resolve(taskData))
      const taskId = '1'
      const newTaskData = { ...taskData }
      jest.spyOn(taskService, 'editTask').mockImplementation(async () => mockResponse);
      jest.spyOn(repo, 'findOneOrFail').mockImplementation(async () => findOneOrFail);
      const expectedResult = { ...updatedResult }

      // Act
      const r = await taskController.editTask(taskId, newTaskData);

      // Assert
      expect(taskService.editTask).toBeCalledTimes(1);
      expect(r).toEqual(expectedResult);
    });
  });
});
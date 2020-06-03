import * as faker from "faker";

const taskSeed = []
const range = 9

for (let index = 0; index < range; index++) {
  taskSeed.push({
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    isEnabled: true,
    isCompleted: false,
  });
}

for (let index = 0; index < range; index++) {
  taskSeed.push({
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    isEnabled: true,
    isCompleted: true,
  });
}

for (let index = 0; index < range; index++) {
  taskSeed.push({
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    isEnabled: false,
    isCompleted: false,
  });
}

export default taskSeed
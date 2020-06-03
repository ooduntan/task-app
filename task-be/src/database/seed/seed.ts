import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seed.module';
import { SeederService } from './seed.service';


async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      // const logger = appContext.get(Logger);
      const seeder = appContext.get(SeederService);
      seeder
        .seed()
        .then(() => {
          console.log('Seeding complete!');
        })
        .catch(error => {
          console.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
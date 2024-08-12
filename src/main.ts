import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PapertrailLogger } from './logger';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const logger = new Logger("main");
  const app = await NestFactory.create(AppModule);
  const papertrailLogger = app.get(PapertrailLogger);
  app.useLogger(papertrailLogger);  
  // לבדוק שזה עובד!!-הוספת הגדרת !!CORS לכל הדומיינים (למטרות פיתוח בלבד)
  app.enableCors();
  await app.listen(4000);
  logger.log('Server is running on http://localhost:4000');
}
bootstrap();

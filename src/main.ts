import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PapertrailLogger } from './logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const papertrailLogger = app.get(PapertrailLogger);
  app.useLogger(papertrailLogger);  
  // לבדוק שזה עובד!!-הוספת הגדרת !!CORS לכל הדומיינים (למטרות פיתוח בלבד)
  app.enableCors();
  await app.listen(4000);
  papertrailLogger.log('Server is running on http://localhost:4000');
}
bootstrap();

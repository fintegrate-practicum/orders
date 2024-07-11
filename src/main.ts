import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // לבדוק שזה עובד!!-הוספת הגדרת !!CORS לכל הדומיינים (למטרות פיתוח בלבד)
  app.enableCors();
בםמדא ט = 0ף
בםמדא ט= 9ף
  await app.listen(8787);
  console.log('Server is running on http://localhost:8787');
}
bootstrap();

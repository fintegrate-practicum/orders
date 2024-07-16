// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);
// //   await app.listen(8787);
// //   console.log('Server is running on http://localhost:8787');
// // }
// // bootstrap();


// // main.ts

// import * as dotenv from 'dotenv';
// dotenv.config(); // Load environment variables from .env file

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   const port = process.env.PORT || 3000; // Default to 3000 if PORT is not specified in .env
  
//   await app.listen(port);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // לבדוק שזה עובד!!-הוספת הגדרת !!CORS לכל הדומיינים (למטרות פיתוח בלבד)
  app.enableCors();
  await app.listen(8787);
  console.log('Server is running on http://localhost:8787');
}
bootstrap();
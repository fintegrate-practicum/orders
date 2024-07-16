// // import { Module, OnModuleInit } from '@nestjs/common';
// // import { AppController } from './app.controller';
// // import { AppService } from './app.service';
// // import { UserModule } from './module/user.module';
// // import { ManagerModule } from './module/manager.module';
// // import { MongooseModule } from '@nestjs/mongoose';
// // import { OrderModule } from './module/order.module';
// // import { ConfigModule } from '@nestjs/config';

// // @Module({
// //   imports: [
// //     ConfigModule.forRoot({ envFilePath: '.env' }), // Configure .env loading
// //     MongooseModule.forRoot(process.env.MONGODB_URI),
// //     UserModule,
// //     ManagerModule,
// //     OrderModule,
// //   ],
// //   controllers: [AppController],
// //   providers: [AppService],
// // })
// // export class AppModule implements OnModuleInit {
// //   async onModuleInit() {
// //     try {
// //       // הודעה כאשר התחברות למסד הנתונים מוצלחת
// //       console.log('Connected to MongoDB successfully!');
// //     } catch (error) {
// //       // הודעת שגיאה אם יש בעיה בהתחברות למסד הנתונים
// //       console.error('Failed to connect to MongoDB:', error);
// //     }
// //   }
// // }



// import { Module, OnModuleInit } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './module/user.module';
// import { ManagerModule } from './module/manager.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { OrderModule } from './module/order.module';
// import { ConfigModule } from '@nestjs/config';
// @Module({
//   imports: [
//     ConfigModule.forRoot({ envFilePath: '.env' }), // Configure .env loading
//     MongooseModule.forRoot(process.env.MONGODB_URI),
//     UserModule,
//     ManagerModule,
//     OrderModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule implements OnModuleInit {
//   async onModuleInit() {
//     try {
//       // הודעה כאשר התחברות למסד הנתונים מוצלחת
//       console.log('Connected to MongoDB successfully!');
//     } catch (error) {
//       // הודעת שגיאה אם יש בעיה בהתחברות למסד הנתונים
//       console.error('Failed to connect to MongoDB:', error);
//     }
//   }
// }




import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { ManagerModule } from './module/manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './module/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }), // Configure .env loading
    //  MongooseModule.forRoot(process.env.MONGODB_URI),
     MongooseModule.forRoot("mongodb://localhost:27017"),
    UserModule,
    ManagerModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try {
      // Check MongoDB URI
       console.log('MongoDB URI:', process.env.MONGODB_URI);


      // Message when connected to the database successfully
      console.log('Connected to MongoDB successfully!');
    } catch (error) {
      // Error message if there is a problem connecting to the database
      console.error('Failed to connect to MongoDB:', error);
    }
  }
}


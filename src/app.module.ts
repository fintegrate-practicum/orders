import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { ManagerModule } from './module/manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './module/order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://yaffiz20:Yz325932168@cluster0.ppod22n.mongodb.net/ordersDB?tls=true&tlsAllowInvalidCertificates=true '),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule, ManagerModule,OrderModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

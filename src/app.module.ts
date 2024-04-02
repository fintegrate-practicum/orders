import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { OrdersModule } from './module/orders/orders.module';
import { UserModule } from './module/user.module';
import { ManagerModule } from './module/manager.module';



@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://yaffiz20:Yz325932168@cluster0.ppod22n.mongodb.net/ordersDB?tls=true&tlsAllowInvalidCertificates=true '),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule, ManagerModule
    //! OrdersModule,
   
  ],
  controllers: [AppController, OrdersController,],
  providers: [AppService, OrdersService],

})
export class AppModule {
  
}

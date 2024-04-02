import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { ManagerService } from '../service/manager.service';
import { ManagerController } from '../controller/manager.controller';
// import { MongooseModule } from '@nestjs/mongoose';



@Module({
  // imports: [MongooseModule.for],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule { }

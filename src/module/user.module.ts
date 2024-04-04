import { Module } from '@nestjs/common';
// import { MongoosrModule } from '@nestjs/mongoose';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';

@Module({
  // imports: [MongooseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }

import { Module } from '@nestjs/common';
import { ManagerService } from '../service/manager.service';
import { ManagerController } from '../controller/manager.controller';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}

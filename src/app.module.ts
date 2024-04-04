import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { ManagerModule } from './module/manager.module';

@Module({
  imports: [UserModule, ManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

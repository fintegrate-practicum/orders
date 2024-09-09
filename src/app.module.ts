import { Module, OnModuleInit,Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { ManagerModule } from './module/manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './module/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CartModule } from './module/cart.module';
import { AuthzModule } from 'fintegrate-auth'
import { PapertrailLogger } from './logger'

@Module({
  imports: [
    AuthzModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    CartModule,
    UserModule,
    ManagerModule,
    OrderModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PapertrailLogger],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() {
    try {
      // הודעה כאשר התחברות למסד הנתונים מוצלחת
      this.logger.log('Connected to MongoDB successfully!');
    } catch (error) {
      // הודעת שגיאה אם יש בעיה בהתחברות למסד הנתונים
      this.logger.error('Failed to connect to MongoDB:', error);
    }
  }
}

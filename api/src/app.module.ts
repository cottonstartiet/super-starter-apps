import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/AppConfigModule';
import { AppConfigService } from './config/AppConfigService';

const mongodbConnection = process.env.mongodbConnection;
console.log(mongodbConnection);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.mongoConnectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };

        return options;
      },
    }),
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }

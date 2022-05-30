import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppConfigService } from './AppConfigService';

@Module({
  exports: [AppConfigService],
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigService],
})
// eslint-disable-next-line prettier/prettier
export class AppConfigModule { }

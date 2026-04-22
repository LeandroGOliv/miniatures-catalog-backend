import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { MiniaturesModule } from './miniatures/miniatures.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, MiniaturesModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { challengeSchema } from './modules/Challenge';
import { UserSchema } from './modules/User';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot("mongodb://localhost:2717/"),
    MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'Challenge', schema: challengeSchema }
      ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

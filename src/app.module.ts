import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { challengeSchema } from './modules/Challenge';
import { UserSchema } from './modules/User';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://*****:*******@challengeorganizer.kndy1kv.mongodb.net/?retryWrites=true&w=majority"),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema },
  { name: 'Challenge', schema: challengeSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

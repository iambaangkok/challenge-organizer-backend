// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport/dist';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/typeorm/entities/User';
// import { UsersService } from 'src/users/services/users.service';
// import { AuthController } from './controllers/auth/auth.controller';
// import { ServicesService } from './services/services.service';

// @Module({
//   imports : [
//     TypeOrmModule.forFeature([User]),PassportModule],
//   controllers: [AuthController],
//   providers: [
//     {
//       provide : 'AUTH_SERVICE',
//       useClass : ServicesService,
//     },
//     {
//       provide : 'USER_SERVICE',
//       useClass : UsersService
//     }
//   ]
// })
// export class AuthModule {}


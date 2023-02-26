import { Module, NestModule } from '@nestjs/common';
import { User } from '../typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { ExampleMiddleware } from './middlewares/example/example.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule implements NestModule {
    configure(customer: MiddlewareConsumer) {
        customer.apply(ExampleMiddleware).forRoutes('users');
    }
}

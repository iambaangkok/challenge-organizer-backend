import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
import { Challenge } from './typeorm/entities/Challenge';
// import { PostsModule } from './posts/posts.module';
import { ShopsModule } from './shops/shops.module';
import { Profile } from './typeorm/entities/Profile';
import { ConfigModule } from '@nestjs/config';
console.log(process.env.DB_URL + '/' + process.env.ENVIRONMENT);
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            useUnifiedTopology: true,
            type: 'mongodb',
            url: process.env.DB_HOST + '/' + process.env.ENVIRONMENT, //กลับมาถามหรัสด้วย
            useNewUrlParser: true,
            synchronize: false,
            logging: true,
            port: parseInt(process.env.PORT, 10) || 3000,
            host: 'localhost',
            database: 'test',
            // "entities": ["src/entity/*.*"]
            entities: [User, Challenge, Profile],
            migrationsTableName: 'test',
        }),
        ChallengesModule,
        UsersModule,
        ShopsModule,
    ], //PostsModule
    // mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

    controllers: [],
    providers: [],
})
export class AppModule {}

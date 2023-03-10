import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
import { Challenge } from './typeorm/entities/Challenge';
import { TaskTemplate } from './typeorm/entities/TaskTemplate';
import { ParticiPantsGiveScore } from './typeorm/entities/participantsGiveScore';
import { Task } from './typeorm/entities/Task';
import { Submission } from './typeorm/entities/Submission';
import { Team } from './typeorm/entities/Team';
import { File } from './typeorm/entities/File';
import { Item } from './typeorm/entities/Item';
import { Rating } from './typeorm/entities/Rating';
import { Tab } from './typeorm/entities/Tab';
import { Post } from './typeorm/entities/Post';
// import { ShopsModule } from './shops/shops.module';
// import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
// console.log(process.env.DB_URL + '/' + process.env.ENVIRONMENT);
@Module({
    // imports: [
    //     ConfigModule.forRoot({
    //         isGlobal: true,
    //     }),
    //     TypeOrmModule.forRoot({
    //         useUnifiedTopology: true,
    //         type: 'mongodb',
    //         url: process.env.DB_HOST + '/' + process.env.ENVIRONMENT, //กลับมาถามหรัสด้วย
    //         useNewUrlParser: true,
    //         synchronize: false,
    //         logging: true,
    //         port: parseInt(process.env.PORT, 10) || 3000,
    //         host: 'localhost',
    //         database: 'test',
    //         // "entities": ["src/entity/*.*"]
    //         entities: [User, Challenge, Profile,Post],
    //         migrationsTableName: 'dev',
    //     }),
    //     ChallengesModule,
    //     UsersModule,
    //     ShopsModule,
    //     PostsModule,
    // ], //PostsModule
    // // mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});


    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: 'dev',
            entities: [
                // "src/typeorm/entity/*.*"
                User,
                Challenge,
                TaskTemplate,
                ParticiPantsGiveScore,
                Task,
                Submission,
                Team,
                File,
                Item,
                Rating,
                Tab,
                Post

            ],
            synchronize: true,
            username: 'root',
            // autoLoadEntities: true,
            // password: ,

        }),
        ChallengesModule,
        UsersModule,
        AuthModule,
        TaskModule,
        // ShopsModule,
        // PostsModule
    ],

    controllers: [],
    providers: [],
})
export class AppModule { }

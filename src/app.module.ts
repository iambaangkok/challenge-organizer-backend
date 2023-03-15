import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
import { Challenge } from './typeorm/entities/Challenge';
import { ParticiPantsGiveScore } from './typeorm/entities/ParticiPantsGiveScore';
import { Task } from './typeorm/entities/Task';
import { Submission } from './typeorm/entities/Submission';
import { Team } from './typeorm/entities/Team';
import { File } from './typeorm/entities/File';
import { Item } from './typeorm/entities/Item';
import { Rating } from './typeorm/entities/Rating';
import { Tab } from './typeorm/entities/Tab';
import { Post } from './typeorm/entities/Post';
// import { ShopsModule } from './shops/shops.module';
import { TaskModule } from './task/task.module';
import { FilesModule } from './files/files.module';
import { ItemsModule } from './items/items.module';
import { TabsModule } from './tabs/tabs.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: 'localhost',
        //     port: 3306,
        //     database: 'dev',
        //     entities: [
        //         // "src/typeorm/entity/*.*"
        //         User,
        //         Challenge,
        //         ParticiPantsGiveScore,
        //         Task,
        //         Submission,
        //         Team,
        //         File,
        //         Item,
        //         Rating,
        //         Tab,
        //         Post,
        //     ],
        //     synchronize: true,
        //     username: 'root',
        //     // autoLoadEntities: true,
        //     // password: 'password' ,
        // }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', ''),
            serveStaticOptions: {
                index: false,
            },
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '10.10.182.143',
            // host: 'localhost',
            port: 3306,
            database: 'prod', // this maybe dev, test, or prod
            entities: [
                User,
                Challenge,
                ParticiPantsGiveScore,
                Task,
                Submission,
                Team,
                File,
                Item,
                Rating,
                Tab,
                Post,
            ],
            synchronize: true,
            username: 'dev',
            // username: 'root',
            password: 'password',
        }),
        ChallengesModule,
        UsersModule,
        TaskModule,
        FilesModule,
        ItemsModule,
        TabsModule,
        // ShopsModule,
        PostsModule,
        MulterModule.register({ dest: './uploads ' }),
    ],

    controllers: [],
    providers: [],
})
export class AppModule {}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// // import { Post } from 'src/typeorm/entities/Post';
// import { User } from 'src/typeorm/entities/User';
// import { Repository } from 'typeorm';

// @Injectable()
// export class PostsService {
//     constructor(
//         // @InjectRepository(Post)
//         // private postRepository: MongoRepository<Post>,
//         @InjectRepository(User)
//         private userRepository: Repository<User>,
//     ) { }


//     async findPost() {
//         const post = await this.postRepository.find();
//         return 0;
//     }



//     async createPost() {
//         // const user = await this.userRepository.findOneById(userId)
//         const children = [
//             { 
//                 comments : "ฉันเห็นด้วยนะ เจ้าลิง",
//                 postAt :  new Date(),
//             },
//             { 
//                 comments : "จริงงงงงงงงงงงงงงที่สูดดดดดดด",
//                 postAt :  new Date(),
//             }
//         ]
//         const newPost = await this.postRepository.create({
//             title: 'สุดยอดกิจกรรม',
//             description: 'นะนะนั้น เป็นชื่อการแข่งขันที่สุดยอดมาก',
//             postAt: new Date(),
//             treeChildren : children
//         })
//         await this.postRepository.save(newPost)

//         return newPost
//     }



// }

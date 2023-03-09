import { 
    Controller, 
    Get, 
    Post,
    Delete,
    Param,
    Put,
    Body
} from '@nestjs/common';
import { CreatePostDto } from 'src/dto/CreatePost.dto';
import { EditPostDto } from 'src/dto/EditPost.dto';
import { PostsService } from 'src/posts/services/posts/posts.service';

@Controller('/api/posts')
export class PostsController {
    constructor(private postService:PostsService){}

    @Get('/:postId')
    getPostById(@Param('postId') postId: number){
        console.log(`GET /postId`);
        return this.postService.findByPostId(postId);
    }

    @Get('/:tabName')
    getPostByTab(@Param('tabName') tabName: string){
        console.log(`GET /tabName`);
        return this.postService.findPostByTab(tabName);
    }

    @Post()
    createPost(@Body() postDetails: CreatePostDto){
        console.log(`/`);
        return this.postService.createPost(postDetails);
    }

    @Put('/:postId')
    editPost(
        @Param('postId') postId: number,
        @Body() editPostDto: EditPostDto
    ){
        console.log(`PUT /${postId}`);
        return this.postService.editPose(
            postId,
            editPostDto
        )
    }

    @Delete('/:postId')
    deletePost(@Param('postId') postId: number){
        console.log(`DELETE /${postId}`);
        return this.postService.deletePost(postId);
    }

}

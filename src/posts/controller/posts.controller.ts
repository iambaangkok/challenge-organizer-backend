import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Put,
    Body,
} from '@nestjs/common';
import { FindPostDto } from 'src/dto/FindPost.dto';
import { CreatePostDto } from '../../dto/CreatePost.dto';
import { DeletePostDto } from '../../dto/DeletePost.dto';
import { EditPostDto } from '../../dto/EditPost.dto';
import { PostsService } from '../services/posts.service';

@Controller('/api/posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Get('/')
    getAllPost() {
        console.log(`GET /`);
        return this.postService.findAllPost();
    }

    @Get('/:postId')
    getPostById(@Param('postId') postId: number) {
        console.log(`GET /postId`);
        return this.postService.findByPostId(postId);
    }

    @Get('/get-post-by-tab/:tabName')
    getPostByTab(
        @Param('tabName') tabName: string,
        @Body() challengeTitle: FindPostDto
        ) {
        console.log(`GET /tabName`);
        return this.postService.findPostByTab(tabName, challengeTitle);
    }

    @Post('/')
    createParentPost(@Body() postDetails: CreatePostDto) {
        console.log(`/createParent`);
        return this.postService.createParentPost(postDetails);
    }

    @Post('/:postId')
    createChildrenPost(
        @Param('postId') postId: number,
        @Body() postDetials: CreatePostDto,
    ) {
        console.log(`/createChildren`);
        return this.postService.createChildrenPost(postId, postDetials);
    }

    @Put('/:postId')
    editPost(
        @Param('postId') postId: number,
        @Body() editPostDto: EditPostDto,
    ) {
        console.log(`PUT /${postId}`);
        return this.postService.editPost(postId, editPostDto);
    }

    @Delete('/:postId')
    deletePost(
        @Param('postId') postId: number,
        @Body() deletePostDto: DeletePostDto,
    ) {
        console.log(`DELETE /${postId}`);
        return this.postService.deletePost(postId, deletePostDto);
    }
}

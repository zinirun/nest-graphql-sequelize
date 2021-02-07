import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostInput } from '../../autogen/schema.graphql';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
    constructor(private readonly postService: PostService) {}

    @Query('getPosts')
    async getAll(): Promise<Post[]> {
        return await this.postService.getAll();
    }

    @Query('getPostById')
    async getPostById(@Args('id') id: number): Promise<Post> {
        return await this.postService.getOne(id);
    }

    @Mutation('createPost')
    async createPost(@Args('userId') userId: string, @Args('post') post: PostInput): Promise<void> {
        return await this.postService.create(userId, post);
    }

    @Mutation('updatePost')
    async updatePost(@Args('id') id: number, @Args('post') post: PostInput): Promise<Post> {
        return await this.postService.update(id, post);
    }

    @Mutation('deletePost')
    async deletePost(@Args('id') id: number): Promise<number> {
        return await this.postService.delete(id);
    }
}
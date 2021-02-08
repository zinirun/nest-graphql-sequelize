import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostInput } from '../../autogen/schema.graphql';
import { Post } from './post.entity';
import { UserService } from '../user/user.service';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService,
    ) {}

    @Query('getPosts')
    async getAll(): Promise<Post[]> {
        return await this.postService.getAll();
    }

    @Query('getPostsByUserId')
    async getPostsByUserId(@Args('userId') userId: number): Promise<Post[]> {
        return await this.postService.getAllByUserId(userId);
    }

    @Query('searchPostsByTitle')
    async searchPostsByTitlte(@Args('title') title: string): Promise<Post[]> {
        return await this.postService.searchByTitle(title);
    }

    @Query('getPostById')
    async getPostById(@Args('id') id: number): Promise<Post> {
        return await this.postService.getOne(id);
    }

    @Mutation('createPost')
    async createPost(@Args('userId') userId: number, @Args('post') post: PostInput): Promise<void> {
        await this.userService.getOne(userId);
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

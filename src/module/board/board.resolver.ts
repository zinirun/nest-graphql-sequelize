import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post, PostInput } from 'src/autogen/schema.graphql';
import { BoardService } from './board.service';

@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query('getPosts')
    async getAll(): Promise<Post[]> {
        return await this.boardService.getAll();
    }

    @Query('getPostById')
    async getPostById(@Args('id') id: number): Promise<Post> {
        return await this.boardService.getOne(id);
    }

    @Mutation('createPost')
    async createPost(@Args('userId') userId: string, @Args('post') post: PostInput): Promise<Post> {
        return await this.boardService.create(userId, post);
    }

    @Mutation('updatePost')
    async updatePost(@Args('id') id: number, @Args('post') post: PostInput): Promise<Post> {
        return await this.boardService.update(id, post);
    }

    @Mutation('deletePost')
    async deletePost(@Args('id') id: number): Promise<number> {
        return await this.boardService.delete(id);
    }
}

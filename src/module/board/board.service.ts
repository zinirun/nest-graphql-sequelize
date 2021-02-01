import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, PostInput } from 'src/autogen/schema.graphql';
import * as moment from 'moment';

@Injectable()
export class BoardService {
    private posts: Post[] = [];

    async getAll(): Promise<Post[]> {
        return this.posts;
    }

    async getOne(id: number): Promise<Post> {
        const post = this.posts.find((post) => post.id === id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id}: Not Found`);
        }
        return post;
    }

    async create(userId: string, post: PostInput): Promise<Post> {
        const id = this.posts.length + 1;
        this.posts.push({
            id,
            userId,
            createdAt: moment().toDate(),
            ...post,
        });
        return await this.getOne(id);
    }

    async update(id: number, post: PostInput): Promise<Post> {
        await this.getOne(id);
        this.posts = this.posts.map((p) => (p.id === id ? { ...p, ...post } : p));
        return await this.getOne(id);
    }

    async delete(id: number): Promise<number> {
        await this.getOne(id);
        this.posts = this.posts.filter((post) => post.id !== id);
        return id;
    }
}

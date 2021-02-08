import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostInput } from 'src/autogen/schema.graphql';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {}

    async getAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async getOne(id: number): Promise<Post> {
        const post = await this.postRepository.findOne(id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id}: Not Found`);
        }
        return post;
    }

    async getAllByUserId(userId: number): Promise<Post[]> {
        return await this.postRepository.find({
            userId,
        });
    }

    async searchByTitle(title: string): Promise<Post[]> {
        return await this.postRepository.find({
            title: Like(title),
        });
    }

    async create(userId: number, post: PostInput): Promise<void> {
        try {
            await this.postRepository.save({
                ...post,
                userId,
            });
        } catch (err) {
            throw new ConflictException(err);
        }
    }

    async update(id: number, post: PostInput): Promise<Post> {
        await this.getOne(id);
        await this.postRepository.save({
            id,
            ...post,
        });
        return await this.getOne(id);
    }

    async delete(id: number): Promise<number> {
        await this.getOne(id);
        await this.postRepository.delete(id);
        return id;
    }
}

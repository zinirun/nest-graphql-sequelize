import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserInput, UserUpdateInput } from 'src/autogen/schema.graphql';
import { getConnection, Repository } from 'typeorm';
import { Post } from '../post/post.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {}

    getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id}: Not Found`);
        }
        return user;
    }

    /*
    async getOneByUserId(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            userId,
        });
        if (!user) {
            throw new NotFoundException(`User with userId ${userId}: Not Found`);
        }
        return user;
    }
    */

    async isUserIdExist(userId: string): Promise<boolean> {
        const user = await this.userRepository.findOne({
            userId,
        });
        return user ? true : false;
    }

    async create(user: UserInput): Promise<void> {
        if (await this.isUserIdExist(user.userId)) {
            throw new ConflictException(`userId ${user.userId} is already in use`);
        }
        try {
            await this.userRepository.save(user);
        } catch (err) {
            throw new ConflictException(err);
        }
    }

    async update(id: number, user: UserUpdateInput): Promise<User> {
        await this.getOne(id);
        await this.userRepository.save({
            id,
            ...user,
        });
        return await this.getOne(id);
    }

    async delete(id: number): Promise<number> {
        const user = await this.getOne(id);

        const queryRunner = await getConnection().createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await this.postRepository.delete({ user });
            await this.userRepository.delete(id);
            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
            return id;
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserInput, UserUpdateInput } from 'src/autogen/schema.graphql';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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

    async create(user: UserInput): Promise<void> {
        await this.userRepository.save(user);
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
        await this.getOne(id);
        await this.userRepository.delete(id);
        return id;
    }
}

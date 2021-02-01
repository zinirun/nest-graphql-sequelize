import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserInput, UserUpdateInput } from 'src/autogen/schema.graphql';

@Injectable()
export class UserService {
    private users: User[] = [];

    async getAll(): Promise<User[]> {
        return this.users;
    }

    async getOne(id: number): Promise<User> {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id}: Not Found`);
        }
        return user;
    }

    async create(user: UserInput): Promise<User> {
        const id = this.users.length + 1;
        this.users.push({
            id,
            ...user,
        });
        return await this.getOne(id);
    }

    async update(id: number, user: UserUpdateInput): Promise<User> {
        await this.getOne(id);
        this.users = this.users.map((u) => (u.id === id ? { ...u, ...user } : u));
        return await this.getOne(id);
    }

    async delete(id: number): Promise<number> {
        await this.getOne(id);
        this.users = this.users.filter((user) => user.id !== id);
        return id;
    }
}

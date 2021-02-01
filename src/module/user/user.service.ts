import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserInput } from 'src/autogen/schema.graphql';

@Injectable()
export class UserService {
    private users: User[] = [];

    getAll(): Promise<User[]> {
        return new Promise<User[]>((resolve) => {
            resolve(this.users);
        });
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

    async update(id: number, user: UserInput): Promise<User> {
        await this.getOne(id);
        this.users = this.users.map((u) => {
            if (u.id === id) {
                return { id, ...user };
            }
            return u;
        });
        return await this.getOne(id);
    }

    async delete(id: number): Promise<number> {
        await this.getOne(id);
        this.users = this.users.filter((user) => user.id !== id);
        return id;
    }
}

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

    getOne(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const user = this.users.find((user) => user.id === id);
            if (!user) {
                reject(new NotFoundException(`User with ID ${id}: Not Found`));
            }
            resolve(user);
        });
    }

    create(user: UserInput): Promise<User> {
        return new Promise<User>((resolve) => {
            const id = this.users.length + 1;
            this.users.push({
                id,
                ...user,
            });
            resolve(this.getOne(id));
        });
    }

    update(id: number, user: UserInput): Promise<User> {
        return new Promise<User>(async (resolve) => {
            await this.getOne(id);
            this.users = this.users.map((u) => {
                if (u.id === id) {
                    return { id, ...user };
                }
                return u;
            });
            resolve(this.getOne(id));
        });
    }

    delete(id: number): Promise<number> {
        return new Promise<number>(async (resolve) => {
            await this.getOne(id);
            this.users = this.users.filter((user) => user.id === id);
            resolve(id);
        });
    }
}

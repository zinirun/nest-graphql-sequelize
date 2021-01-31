import { Injectable } from '@nestjs/common';
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
        return new Promise<User>((resolve) => {
            resolve(this.users.find((u) => u.id === id));
        });
    }

    create(user: UserInput): Promise<User> {
        return new Promise<User>((resolve) => {
            const id = ++this.users.length;
            this.users.push({
                id,
                ...user,
            });
            resolve(this.getOne(id));
        });
    }
}

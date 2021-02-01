
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UserInput {
    name: string;
    userId: string;
    password: string;
}

export class UserUpdateInput {
    name?: string;
    password?: string;
}

export class PostInput {
    title: string;
    content: string;
}

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;

    abstract getUserById(id: number): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(user: UserInput): User | Promise<User>;

    abstract updateUser(id: number, user: UserUpdateInput): User | Promise<User>;

    abstract deleteUser(id: number): number | Promise<number>;
}

export class User {
    id: number;
    name: string;
    userId: string;
    password: string;
}

export class Post {
    id: number;
    userId: string;
    title: string;
    content: string;
    createdAt: Date;
}

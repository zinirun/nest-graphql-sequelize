
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

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;

    abstract getUserById(): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(user?: UserInput): User | Promise<User>;
}

export class User {
    id: number;
    name: string;
    userId: string;
    password: string;
}

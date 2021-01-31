
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract getAll(): User[] | Promise<User[]>;
}

export class User {
    id: string;
    name: string;
    age: number;
}

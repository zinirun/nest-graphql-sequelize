import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { User, UserInput } from 'src/autogen/schema.graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query('getUsers')
    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    @Query('getUserById')
    async getUserById(id: number): Promise<User> {
        return await this.userService.getOne(id);
    }

    @Mutation('createUser')
    async createUser(user: UserInput): Promise<User> {
        return await this.userService.create(user);
    }
}

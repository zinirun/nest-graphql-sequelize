import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserInput, UserUpdateInput } from 'src/autogen/schema.graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query('getUsers')
    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    @Query('getUserById')
    async getUserById(@Args('id') id: number): Promise<User> {
        return await this.userService.getOne(id);
    }

    @Mutation('createUser')
    async createUser(@Args('user') user: UserInput): Promise<User> {
        return await this.userService.create(user);
    }

    @Mutation('updateUser')
    async updateUser(@Args('id') id: number, @Args('user') user: UserUpdateInput): Promise<User> {
        return await this.userService.update(id, user);
    }

    @Mutation('deleteUser')
    async deleteUser(@Args('id') id: number): Promise<number> {
        return await this.userService.delete(id);
    }
}

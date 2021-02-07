import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserInput, UserUpdateInput } from '../../autogen/schema.graphql';
import { User } from './user.entity';
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
    async createUser(@Args('user') user: UserInput): Promise<void> {
        await this.userService.create(user);
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

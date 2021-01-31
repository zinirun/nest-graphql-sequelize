import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
    @Query()
    async getAll() {
        return [
            {
                id: '1',
                name: 'Peter',
                age: 36,
            },
            {
                id: '2',
                name: 'Grace',
                age: 34,
            },
        ];
    }
}

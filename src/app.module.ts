import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './module/user/user.module';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/autogen/schema.graphql.ts'),
                outputAs: 'class',
            },
        }),
        UserModule,
    ],
})
export class AppModule {}

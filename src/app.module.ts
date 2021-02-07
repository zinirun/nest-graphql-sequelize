import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './module/user/user.module';
import { PostModule } from './module/post/post.module';
import { join } from 'path';
import { DateScalar } from './scalars/date';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/autogen/schema.graphql.ts'),
                outputAs: 'class',
            },
        }),
        UserModule,
        PostModule,
    ],
    providers: [DateScalar],
})
export class AppModule {}

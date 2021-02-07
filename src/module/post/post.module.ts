import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Post } from './post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
    imports: [TypeOrmModule.forFeature([Post, User])],
    providers: [PostResolver, PostService, UserService],
})
export class PostModule {}

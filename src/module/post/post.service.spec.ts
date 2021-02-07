import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';

describe('PostService', () => {
    let service: PostService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostService],
        }).compile();

        service = module.get<PostService>(PostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should return all posts', async () => {
            const result = await service.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });

    // Add Sample Post and use for other tests
    describe('create', () => {
        it('should create', async () => {
            const beforeCreate = await service.getAll().then((posts) => posts.length);
            const samplePost = {
                title: 'sample-title',
                content: 'sample-content',
            };
            await service.create('test-userId', samplePost);
            const afterCreate = await service.getAll().then((posts) => posts.length);
            expect(afterCreate).toBeGreaterThan(beforeCreate);
        });
    });

    describe('getOne', () => {
        it('should get one post', async () => {
            const post = await service
                .getOne(1)
                .then((post) => post)
                .catch((err) => err);
            expect(post.id).toBe(1);
        });
        it('should throw NotFoundException', async () => {
            const post = await service
                .getOne(999)
                .then((post) => post)
                .catch((err) => err);
            expect(post).toBeInstanceOf(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update post', async () => {
            const post = await service
                .update(1, {
                    title: 'update-title',
                    content: 'update-content',
                })
                .then((post) => post)
                .catch((err) => err);
            expect(post.title).toBe('update-title');
        });
        it('should throw NotFoundException', async () => {
            const post = await service
                .update(999, {
                    title: 'update-title',
                    content: 'update-content',
                })
                .then((post) => post)
                .catch((err) => err);
            expect(post).toBeInstanceOf(NotFoundException);
        });
    });

    describe('delete', () => {
        it('should delete post', async () => {
            const id = await service
                .delete(1)
                .then((id) => id)
                .catch((err) => err);
            expect(id).toBe(1);
        });
        it('should throw NotFoundException', async () => {
            const idUnvalid = await service
                .delete(999)
                .then((id) => id)
                .catch((err) => err);
            expect(idUnvalid).toBeInstanceOf(NotFoundException);
        });
    });
});

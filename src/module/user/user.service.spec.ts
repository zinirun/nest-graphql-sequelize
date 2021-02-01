import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserInput } from '../../autogen/schema.graphql';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should return all users', async () => {
            const result = await service.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });

    // Add Sample User and use for other tests
    describe('create', () => {
        it('should create', async () => {
            const beforeCreate = await service.getAll().then((users) => users.length);
            const sampleUser: UserInput = {
                name: 'test-name',
                userId: 'test-userId',
                password: 'test-password',
            };
            await service.create(sampleUser);
            const afterCreate = await service.getAll().then((users) => users.length);
            expect(afterCreate).toBeGreaterThan(beforeCreate);
        });
    });

    describe('getOne', () => {
        it('should get one user', async () => {
            const user = await service
                .getOne(1)
                .then((user) => user)
                .catch((err) => err);
            expect(user.id).toBe(1);
        });
        it('should throw NotFoundException', async () => {
            const user = await service
                .getOne(999)
                .then((user) => user)
                .catch((err) => err);
            expect(user).toBeInstanceOf(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update user', async () => {
            const user = await service
                .update(1, {
                    name: 'update-name',
                })
                .then((user) => user)
                .catch((err) => err);
            expect(user.name).toBe('update-name');
        });
        it('should throw NotFoundException', async () => {
            const user = await service
                .update(999, { name: 'update-name' })
                .then((user) => user)
                .catch((err) => err);
            expect(user).toBeInstanceOf(NotFoundException);
        });
    });

    describe('delete', () => {
        it('should delete user', async () => {
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

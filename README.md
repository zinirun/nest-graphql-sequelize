<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" /></a>
</p>

## Description

sample CRUD operations using [Nest](https://github.com/nestjs/nest) framework

- TypeORM
- GraphQL (schema-first)

## Usage

add file `ormconfig.json` which configures TypeORM connection to project folder

```json
{
    "type": "mysql", // can use other databases
    "host": "localhost",
    "port": 3306,
    "username": "",
    "password": "",
    "database": "", // don't forget to create database
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}
```

install modules and run Nest application

```bash
$ yarn install # npm install
$ yarn start:dev # npm run start:dev
```

- can run GraphQL playground at `http://localhost:PORT/graphql`

### Queries

```graphql
type Query {
    getUsers: [User]
    getUserById(id: Int!): User
    getPosts: [Post]
    getPostsByUserId(userId: Int!): [Post]
    getPostById(id: Int!): Post
    searchPostsByTitle(title: String): [Post]
}
```

### Mutations

```graphql
type Mutation {
    createUser(user: UserInput!): User
    updateUser(id: Int!, user: UserUpdateInput!): User
    deleteUser(id: Int!): Int
    createPost(userId: Int!, post: PostInput!): Post
    updatePost(id: Int!, post: PostInput!): Post
    deletePost(id: Int!): Int
}
```

### Requesting Samples

- Get all users from UserRepository

```graphql
query {
  getUsers {
    id
    name
    userId
  }
}
```

- get all posts from PostRepository
```graphql
query {
  getPosts {
    id
    title
    content
  }
}
```

- create one user to UserRepository

```graphql
mutation createUser($user: UserInput!) {
  createUser(user: $user) {
    id
    name
  }
}
```

```json
// Query Variables
{
  "user": {
    "name": "zini",
    "userId": "zinirun",
    "password": "mypassword"
  }
}
```

- create one post to PostRepository
```graphql
mutation createPost($userId: Int!, $post: PostInput!) {
  createPost(userId: $userId, post: $post) {
    id
    title
    content
    user
  }
}
```

```json
// Query Variables
{
  "userId": 1,
  "post": {
    "title": "hello",
    "content": "hello, nestjs"
  }
}
```

- search posts by title from PostRepository using `Like()`
```graphql
query {
  searchPostsByTitle(title: "hel"){
    id
    title
    content
  }
}
```
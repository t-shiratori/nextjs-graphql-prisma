# nextjs-graphql-prisma

## How to use

### 1\. Move to db-server directory
```
cd db-server
```

### 2\. Start the MySQL Server
```
docker-compose up -d
```

### 3\. Move to Next.js App directory
```
cd app
```

### 4\. Set up .env
```
touch .env
```

Define environment variables「DATABASE_URL」
```
# .env

DATABASE_URL="mysql://root:password-root@127.0.0.1:3306/test-db"
```

### 5\. Install modules
```
npm i
```

### 6\. Migrate database with prisma
```
npx prisma migrate dev --name init
```
If successful, it will look like this
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": MySQL database "test-db" at "127.0.0.1:3306"

Applying migration `20211107121803_init`

The following migration(s) have been applied:

migrations/
  └─ 20211107121803_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (3.4.1) to ./node_modules/@prisma/client in 73ms
```

### 7\. Run Next.js App

```
npm run dev
```

#### Open Browser 

`http://localhost:3000/api/graphql`

<img width="500" alt="スクリーンショット 2021-11-19 9 03 03" src="https://user-images.githubusercontent.com/8470739/142515860-34197199-92ef-4e97-8f22-431cbb64df17.png">


#### Click the 「Query Your Server」 button.

You will see The Apollo Studio Explorer.

<img width="500" alt="スクリーンショット 2021-11-19 9 08 09" src="https://user-images.githubusercontent.com/8470739/142516338-f3e885ba-44d0-4514-bd72-cf10281f9964.png">

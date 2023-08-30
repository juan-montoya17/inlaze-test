# Inlaze Test

Inlaze Test Microservice.

We have the following endpoints:
- `GET /api`
- `GET /api/status`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `POST /api/roles`
- `GET /api/roles/:id`
- `GET /api/roles`
- `PUT /api/roles/:id`
- `DELETE /api/roles/:id`

## Installation

To install the project, we need to have installed the following tools:

- Node.js in the latest version 🟢

If you don't have Node.js installed, you can install the latest version [here](https://nodejs.org/es/)

#### Step 1

Clone the project

```bash
$ git clone https://github.com/juan-montoya17/inlaze-test.git
```

#### Step 2

Install dependencies

```bash
$ npm install
```

#### Step 3

Create the `.env` file. Then, copy the data from `.env.example` file and paste it in the `.env` file. Finally, give values to the environment variables for the development environment.

#### Step 4

Run the database with Docker and Docker-compose 🐋

If you don't have Docker installed, you can install it following
the [Docker documentation](https://docs.docker.com/engine/install/)

<blockquote>
<span>
💡
</span>
<span>
If you install Docker Desktop (on Windows and Mac), it comes with docker compose, but if you install it on Linux you must install it separately.
</span>
</blockquote>

Raise the Docker container that runs the database, by executing the following command in the root of the project:

```bash
$ docker-compose up -d postgres
```

#### Step 5

Run the app

```bash
# normal mode
$ npm run start
```

```bash
# watch mode
$ npm run start:dev
```

```bash
# debug mode
$ npm run start:debug
```

#### Step 6

If the tha app is running correctly, you can see the main route response in the browser, by clicking on the first link
that appears in the terminal.


## Test Instructions

```bash
# unit tests
$ npm run test
```

```bash
# e2e tests
$ npm run test:e2e
```

```bash
# test coverage
$ npm run test:cov
```

## Other Settings

### Migration commands

Make sure that you are in the environment that you want to run the migrations in the `.env` file.

```bash
# run migrations
$ npm run migration:run
```

```bash
# rollback the last migration
$ npm run migration:revert
```

```bash
# show the migration list
$ npm run migration:show
```

```bash
# create a new migration file
$ npm run migration:create --name=<migration-name>
```

```bash
# generate a new migration file, taking into account the changes made in the entities
$ npm run migration:generate --name=<migration-name>
```

### CLI commands

```bash
#  run linter
$ npm run lint
```

```bash
# run linter and fix errors
$ npm run lint:fix
```

# Dare Middleware 

Middleware for Insurance API REST

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

| Framework | Version  |
| ----------| -------- |
| Node      | 14.XX.XX |
| NPM       | 6.XX.XX  |

### Download and install dependencies

```shell
$ git clone https://github.com/yosamac/dare.git
$ cd dare
$ npm install
```

### Usage

```shell
npm start start:dev
```

## API v1 info

### Swagger

The API can be used with the path: 
[API V1](http://localhost:3000/api)


## General configuration

### Environment variables

| Name                    | Description                                | Default                      |
| ------------------------| ------------------------------------------ | -----------------------------|
| API_HOST                | API host                                   | `0.0.0.0`                    |
| API_PORT                | API port                                   | `3000`                       |
| ENDPOINT_ROUTE          | Global URL prefix                          | NO DEFAULT VALUE             |
| NODE_ENV                | Production or development mode             | `development`                |
| LOGGING_LEVEL           | Logs level                                 | `INFO`                       |


## Running the tests

### Unit tests

```shell
npm run test:unit
```

### E2E tests

```shell
npm run test:e2e
```

### Integration tests

```shell
npm run test
```

## Built With

* [NestJS](https://nestjs.com/) - The web framework used

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.org/yosamac/dare/tags).


### Generate Release

```shell
npm run release
```

## Docker

### Generate development Docker image
```shell
npm run build:dev-image
```
### Generate production Docker image
```shell
npm run build:pro-image
```
### Docker compose
```shell
docker-compose up nerdsletter
```

## CI/CD
This repo has Continuous Delivery (in process) and Continuous Integration thanks to [github actions](https://github.com/features/actions). Every commit pushed to the `develop` branch start up the jobs.

## Docker hub repository
[Nerdsletter repository](https://hub.docker.com/repository/docker/yosamac/dare)


## License

[ISC](https://choosealicense.com/licenses/isc/)

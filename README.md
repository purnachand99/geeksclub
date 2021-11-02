# GeeksClub
An application to share the favorite bookmarks.

[![Main Branch CI](https://github.com/sivaprasadreddy/geeksclub/actions/workflows/maven-main.yml/badge.svg)](https://github.com/sivaprasadreddy/geeksclub/actions/workflows/maven-main.yml)

[![CircleCI](https://circleci.com/gh/sivaprasadreddy/geeksclub/tree/main.svg?style=svg)](https://circleci.com/gh/sivaprasadreddy/geeksclub/tree/main)

## Features:
* User Registration and Login
* Create Bookmark
* View Bookmarks by Date with pagination
* View Bookmarks by Tag with pagination
* Search Bookmarks and see results with pagination

## Planned Features
* Up vote or down vote a bookmark
* Subscribe to tags
* Top Contributors
* Share to Twitter, LinkedIn
* User Profile
* Weekly Selections

## Tech Stack
The application is composed of a back-end API and a front-end UI module.

* **geeksclub-api-springboot**: This API is implemented using SpringBoot with SpringMVC based APIs.
* **ui-react**: This is implemented using ReactJS, ReactRouter, Axios, Bootstrap 4

## How to run?
You can change backend/frontend in `run.sh` file `declare services="gc-api-springboot gc-ui-react"` with service names defined in `docker-compose.yaml` file.

```shell
$ ./run.sh start
```

## API Documentation

You can read API endpoints info at [API Documentation](docs/api.md)

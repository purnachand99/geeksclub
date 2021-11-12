# GeeksClub
An application to share the favorite bookmarks.

[![Main Branch CI](https://github.com/sivaprasadreddy/geeksclub/actions/workflows/maven-main.yml/badge.svg)](https://github.com/sivaprasadreddy/geeksclub/actions/workflows/maven-main.yml)

## Features:
* User Login
* Create Bookmark
* View Bookmarks by Date with pagination
* View Bookmarks by Tag with pagination
* Search Bookmarks and see results with pagination

## Planned Features
* User Registration
* Up vote or down vote a bookmark
* Subscribe to tags
* Top Contributors
* Share to Twitter, LinkedIn
* User Profile
* Weekly Selections

## Tech Stack
The application is composed of a back-end API and a front-end UI module.

* **api-springboot**: This API is implemented using SpringBoot with SpringMVC based APIs.
* **ui-react**: This is implemented using ReactJS, ReactRouter, Axios, Bootstrap 4

## How to run?

```shell
$ ./run.sh start
```

# GeeksClub API Endpoints

#### 1. Authentication

```
POST http://localhost:8080/api/auth/login

Request Payload:
{
    "username": "admin@gmail.com",
    "password": "admin"
}

Response:
{
    "access_token": "",
    "expires_at": "",
    "user": {
        "name":"",
        "email":"",
        "role":""
    }
}
```

#### 2. Get Current Login User Info

```
GET http://localhost:8080/api/user

Header: 'Authorization: Bearer {access_token}'

Response:
{
    "name":"",
    "email":"",
    "role":""
}
```

#### 3. Get all Tags

```
GET http://localhost:8080/api/tags

Response:
[
    {
        "id":"",
        "name":""
    },
    {
        "id":"",
        "name":""
    }
]
```

#### 4. Get Bookmarks

```
GET http://localhost:8080/api/bookmarks?page=1&size=15

Response:
{
    "pageNumber": 1,
    "totalPages": 12,
    "totalElements": 120,
    "isFirst": true,
    "isLast": false,
    "hasNext": true,
    "hasPrevious": false,
    "data": [
        {
            "id":"",
            "title":"",
            "url":"",
            "created_user_id":"",
            "created_user_name":"",
            "created_at":"",
            "updated_at":"",
            "tags": ["java", "spring"]
        },
    ]
}
```

#### 5. Get Bookmarks by Tag

```
GET http://localhost:8080/api/tags/{tag}?page=1&size=15

Response:
{
    "pageNumber": 1,
    "totalPages": 12,
    "totalElements": 120,
    "isFirst": true,
    "isLast": false,
    "hasNext": true,
    "hasPrevious": false,
    "data": [
        {
            "id":"",
            "title":"",
            "url":"",
            "created_user_id":"",
            "created_user_name":"",
            "created_at":"",
            "updated_at":"",
            "tags": ["java", "spring"]
        },
    ]
}
```

#### 6. Search Bookmarks

```
GET http://localhost:8080/api/bookmarks/search?query={keyword}&page=1&size=15

Response:
{
    "pageNumber": 1,
    "totalPages": 12,
    "totalElements": 120,
    "isFirst": true,
    "isLast": false,
    "hasNext": true,
    "hasPrevious": false,
    "data": [
        {
            "id":"",
            "title":"",
            "url":"",
            "created_user_id":"",
            "created_user_name":"",
            "created_at":"",
            "updated_at":"",
            "tags": ["java", "spring"]
        },
    ]
}
```


#### 7. Get Bookmark by Id

```
GET http://localhost:8080/api/bookmarks/{id}

Response:
{
    "id": 1
    "title":"",
    "url":"",
    "created_user_id":"",
    "created_user_name":"",
    "created_at":"",
    "updated_at":"",
    "tags": ["java", "spring"]
}
```

#### 8. Create Bookmark

```
POST http://localhost:8080/api/bookmarks

Header: 'Authorization: Bearer {access_token}'

Request Payload:
{
    "title":"",
    "url":"",
    "tags": ["java", "spring"]
}

Response Code 201
```

#### 9. Update Bookmark

```
PUT http://localhost:8080/api/bookmarks/{id}

Header: 'Authorization: Bearer {access_token}'

Request Payload:
{
    "title":"",
    "url":"",
    "tags": ["java", "spring"]
}

Response Code 200
```


#### 10. Delete Bookmark

```
DELETE http://localhost:8080/api/bookmarks/{id}

Header: 'Authorization: Bearer {access_token}'

Response Code 200
```

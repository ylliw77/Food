


ENDPOINTS :

 NON-PUBLIC SITE :

    END POINT FOR USER :

[x] POST /register

Request:

- body:
```json
{
  "email": "string",
  "password": "string",
  "phoneNumber":"string",
  "address" : "string",
  "role" : "string"
}
```
_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "role" : "admin"

}
```
Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

[x] POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
  ​

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad request)_

```json
```json
{
  "message": "Invalid email/password"
}
```

_Response (401 - USER_NOT_FOUND)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;
[x] POST /add-user

Request:

- body:
```json
{
  "email": "string",
  "password": "string",
  "phoneNumber":"string",
  "address" : "string",
  "role" : "string"
}
```
_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "role" : "staff"

}
```
Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;


    END POINT FOR MAIN ENTITY : 
        
[x] GET /cuisines
Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_
  ​

```json
[
  {
    "id": 4,
        "name": "Tomato Basil Soup",
        "description": "Rich and flavorful tomato soup with fresh basil.",
        "price": 6000,
        "image": "https://example.com/tomato_basil_soup.jpg",
        "category": 5,
        "createdAt": "2023-11-27T08:45:04.762Z",
        "updatedAt": "2023-11-30T09:39:56.311Z",
        "author": "admin@mail.com",
        "phoneNumber": "9876543210",
        "address": "456 Oak Avenue",
  },
  {
    "id": 5,
        "name": "Grilled Salmon",
        "description": "Fresh salmon fillet seasoned and grilled to perfection.",
        "price": 18000,
        "image": "https://example.com/grilled_salmon.jpg",
        "category": 7,
          "createdAt": "2023-11-27T08:45:04.762Z",
    "updatedAt": "2023-11-30T09:39:56.311Z"
        "author": "staff@mail.com",
        "phoneNumber": "1234567890",
        "address": "123 Main Street"
  },
  ...
]
```

&nbsp;

[x] POST /cuisines

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
    "name": "Rujak Cingur",
    "description": "Makanan khas dar Indonesia yang berasal dari pulau Jawa",
    "price": 12000,
    "imgUrl": "Foto Rujak Cingur",
    "categoryId": 1,
}
```

_Response (201 - Created)_

```json
{
  "id": 26,
    "name": "Rujak Cingur",
    "description": "Makanan khas dar Indonesia yang berasal dari pulau Jawa",
    "price": 12000,
    "imgUrl": "Foto Rujak Cingur",
    "categoryId": 1,
    "authorId": 2,
    "updatedAt": "2023-12-02T05:54:57.415Z",
    "createdAt": "2023-12-02T05:54:57.415Z"
}
```

&nbsp;

[x] GET /cuisines/:id

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```
- Response (200 - Ok)_
```json
{
    "id": 1,
    "name": "Spaghetti Bolognese",
    "description": "Classic Italian pasta dish with meat sauce.",
    "price": 12000,
    "imgUrl": "https://res.cloudinary.com/dph9xmts0/image/upload/v1701337195/gc01/1701337189042.jpg",
    "categoryId": 6,
    "authorId": 1,
    "createdAt": "2023-11-27T08:45:04.762Z",
    "updatedAt": "2023-11-30T09:39:56.311Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

[x] PUT /cuisines/:id

Description :
  Update one of the current logged in user. if user role is admin can Update any main entity, if user role is staff "Only Update his/her own entity"

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```
- body:
```json
{
   "name": "Spaghetti Bolognese",
    "description": "Classic Italian pasta dish with meat sauce.",
    "price": 12000,
    "imgUrl": "https://res.cloudinary.com/dph9xmts0/image/upload/v1701337195/gc01/1701337189042.jpg",
    "categoryId": 6,
}
```


_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Spaghetti Bolognese",
        "description": " Classic Italian pasta dish with meat sauce.",
        "price": 12000,
        "imgUrl": "https://res.cloudinary.com/dph9xmts0/image/upload/v1701337195/gc01/1701337189042.jpg",
        "categoryId": 6,
        "authorId": 1,
        "createdAt": "2023-11-27T08:45:04.762Z",
        "updatedAt": "2023-12-02T06:01:41.762Z"
    }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

&nbsp;

[x] DELETE /cuisines/:id

description: 
  Delete one of the current logged in user. if user role is admin can delete any main entity, if user role is staff "Only delete his/her own enity"

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Cuisine with id <id> success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

&nbsp;


[x] PATCH /cuisines/:id/img-url

Description :
  Update one of the current logged in user. if user role is admin can Update any main entity, if user role is staff "Only Update his/her own entity"

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```
- body:
```json
{
  "imgUrl" : "string/link from cloudinary"
}
```


_Response (200 - OK)_

```json
{
    "message" : "Image Url has been updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden access"
}
```

&nbsp;

    END POINT FOR SUPPORT ENTITY :

[x] GET /categories

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_
  ​

```json
[
    {
        "name": "Main Dishes"
    },
    {
        "name": "Desserts"
    },
    {
        "name": "Salads"
    },
  ...
]
```

&nbsp;

[x] POST /categories
Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json

 {
    "name": "Rujak",
}

```

_Response (201 - Created)_

```json
{
   "id": 13,
    "name": "Rujak",
    "updatedAt": "2023-12-02T06:19:21.087Z",
    "createdAt": "2023-12-02T06:19:21.087Z"
}

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

[x] PUT /categories/:id

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```
- params:
```json
{
  "id": "integer"
}
```

- body:
```json

 {
    "name": "Sweets",
}

```

_Response (201 - Created)_

```json
{
   "id": 13,
    "name": "Sweets",
    "updatedAt": "2023-12-02T06:19:21.087Z",
    "createdAt": "2023-12-02T06:19:21.087Z"
}

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```


&nbsp;



[x] DELETE /categories/:id
Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```
- params:
```json
{
  "id": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message" : "Category with id <id> success  to delete"
}

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```



    PUBLIC SITE :

[x] GET /pub/cuisines

_Response (200 - OK)_
  ​

```json
[
  {
    "id": 4,
        "name": "Tomato Basil Soup",
        "description": "Rich and flavorful tomato soup with fresh basil.",
        "price": 6000,
        "image": "https://example.com/tomato_basil_soup.jpg",
        "category": 5,
        "author": "admin@mail.com",
        "phoneNumber": "9876543210",
        "address": "456 Oak Avenue"
  },
  {
    "id": 5,
        "name": "Grilled Salmon",
        "description": "Fresh salmon fillet seasoned and grilled to perfection.",
        "price": 18000,
        "image": "https://example.com/grilled_salmon.jpg",
        "category": 7,
        "author": "staff@mail.com",
        "phoneNumber": "1234567890",
        "address": "123 Main Street"
  },
  ...
]
```

&nbsp;

[x] GET /pub/cuisines/:id

- params:
```json
{
  "id": "integer"
}
```
- Response (200 - Ok)_
```json
{
    "id": 1,
    "name": "Spaghetti Bolognese",
    "description": "Classic Italian pasta dish with meat sauce.",
    "price": 12000,
    "imgUrl": "https://res.cloudinary.com/dph9xmts0/image/upload/v1701337195/gc01/1701337189042.jpg",
    "categoryId": 6,
    "authorId": 1,
    "createdAt": "2023-11-27T08:45:04.762Z",
    "updatedAt": "2023-11-30T09:39:56.311Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Login required"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```









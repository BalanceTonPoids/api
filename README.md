# API For balance ton poids
Api made with Node Js, Express and MongoDB

## Installation

```bash
npm install

```

## Usage

```bash

npm run start # start the server

# server address: http://localhost:3000

npm run lint # lint for errors

npm run format # format the code

```

### Routes

For the routes, you can see the src/routes.js file
The base url is http://localhost:3000/v1
> The v1 is the version of the api, that might change in the future !
> Note: The routes are not protected, you can use Postman to test the routes

#### User

| Method | Route | Description |
| ------ | ------ | ------ |
| POST | /users | Create a new user |
| GET | /users/:id | Get a user by id |
| PATCH | /users/:id | Update a user by id |
| DELETE | /users/:id | Delete a user by id |

#### Scale Data

| Method | Route | Description |
| ------ | ------ | ------ |
| POST | /data_scale/:iduser | Create a new scale data and link to the id user |
| GET | /data_scale/:id | Get a scale data by id|
| DELETE | /data_scale/:id | Delete a scale data by id|
> Note: The iduser is the id of the user, you can get it from the user route

#### Admin Routes

| Method | Route | Description |
| ------ | ------ | ------ |
| GET | /admin/users | Get all users |
| GET | /admin/count | Get the number of users |


### Schema
Full Schema of the user
```json
{
    "id": "string",
    "email": "string",
    "password": "string",
    "name": "string",
    "phone": "string",
    "gender": "string",
    "metric": "string",
    "age": "number",
    "height": "number",
    "scale_data": [{
        "id": "string",
        "date": "timeStamp",
        "weight": "number",
        "IMC": "number",
        "fat": "number",
        "muscle": "number",
        "water": "number"
    }],
    "created_at": "timestamp",
    "updated_at": "timestamp" 
}
```

Collection of scale data
```json
{
    "id": "string",
    "date": "timeStamp",
    "weight": "number",
    "IMC": "number",
    "fat": "number",
    "muscle": "number",
    "water": "number"
}
```


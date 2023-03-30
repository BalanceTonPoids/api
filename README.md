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
> Note: The routes need to be logged in to access them, except the auth routes

After login please set the header Authorization with the token you get from the login route
```js
// Exemple
headers: {
    Authorization: `Bearer ${token}`
}
```

#### User

| Method | Route | Description |
| ------ | ------ | ------ |
| GET | /users | Get a user by id |
| PUT | /users | Update a user by id |
> The Id is from the JWT token, need to be logged in to get the id.
#### Scale Data

| Method | Route | Description |
| ------ | ------ | ------ |
| POST | /data_scale | Create a new scale data and link to the id user |
| GET | /data_scale/:id | Get a scale data by id|
| DELETE | /data_scale/:id | Delete a scale data by id|
> You need to be logged in to get the id of the user and be able to access the scale data

#### Admin Routes

| Method | Route | Description |
| ------ | ------ | ------ |
| GET | /admin/countUser | Get the number of users |
| GET | /admin/getUser | Get all users |
| GET | /admin/getUser/:id | Get a user by id |
| POST | /admin/createUser | Create a new user |
| DELETE | /admin/deleteUser/:id | Delete a user by id |

> You need to be logged in as an admin to access these routes

#### Auth

| Method | Route | Description |
| ------ | ------ | ------ |
| POST | /auth/login | Login a user |
| POST | /auth/register | Register a new user |
| POST | /auth//forgotPassword | Send an email to reset the password |
| GET | /auth/resetPassword | Reset the password |
> For login and register, you need to send the email and the password in the body of the request
> For forgot password, you need to send the email in the body of the request
> For reset password, you need to send the token, id and the new password in the body of the request



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
    "role": "string",
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


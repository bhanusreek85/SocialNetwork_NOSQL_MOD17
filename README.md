# SocialNetwork_NOSQL_MOD17

## Description
SocialNetwork_NOSQL_MOD17 is a social network application built using MongoDB, Express.js, and Node.js. This application allows users to create accounts, post thoughts, react to thoughts, and add friends. It demonstrates the use of NoSQL databases to manage relationships and interactions between users.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Video Walkthrough](#video-walkthrough)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone the repository:
   ```bash
   ```git clone https://github.com/bhanusreek85/SocialNetwork_NOSQL_MOD17.git```
2. Navigate to the project directory:
```cd SocialNetwork_NOSQL_MOD17```
3. Install the dependencies:
```npm install```
4. Set up your MongoDB connection string in a .env file:
```MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/socialnetworkDB?retryWrites=true&w=majority```

## Usage
1. Start the server:
```npm run start```
2. The server will run on http://localhost:3000

## API Endpoints

### Users
GET /api/users: Get all users
POST /api/users: Create a new user
GET /api/users/:userId: Get a user by ID
PUT /api/users/:userId: Update a user by ID
DELETE /api/users/:userId: Delete a user by ID
POST /api/users/:userId/friends/:friendId: Add a friend
DELETE /api/users/:userId/friends/:friendId: Remove a friend

### Thoughts
GET /api/thoughts: Get all thoughts
POST /api/thoughts: Create a new thought
GET /api/thoughts/:thoughtId: Get a thought by ID
Get /api/thoughts/:thoughtId/reactions/:reactionId: Get a reaction by ID
POST  /api/thoughts/:thoughtId/reactions: Create reaction 

## MODELS

### User
```js
{
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (email) => {
            return /.+@.+\..+/.test(email);
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}
```
### Thought
```js
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}
```

### Reaction
```js
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    }
}
```

## Video Walkthrough
Here is the link for demonstartion of the application
[Application walk through link](https://drive.google.com/file/d/1ShjVh_RKp8UxRkmru7cgvZCRAFMSxZHA/view?usp=drive_link)

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.





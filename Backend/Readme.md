
```markdown
# API Documentation

## Base URL
```

[http://localhost:5000/api/v1](http://localhost:5000/api/v1)


---

## 🔹 User Routes

### Register User
**POST** `/user/register`

**Description:** Registers a new user.

**Request Body:**
```json
{
    "username":"example",
    "email":"ex@gmail.com",
    "password":"example"
}
````

**Response:**

```json
{
    "message": "User created successfully",
    "user": {
        "username": "example",
        "email": "ex@gmail.com",
        "password": "uru585uyfhjf896tgtou",
        "bio": "",
        "avatar": "",
        "savedPrompts": [],
        "_id": "6693871856883733",
        "createdAt": "2025-09-08T11:47:17.933Z",
        "updatedAt": "2025-09-08T11:47:17.933Z",
        "__v": 0
    },
    "token": "eyJhkjsggjfglsgdj.kjsagi62249sdkhvfk.kasggigad"
}
```

---

### Login User

**POST** `/user/login`

**Description:** Logs in a user and returns a token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
    "message": "User created successfully",
    "user": {
        "username": "example",
        "email": "ex@gmail.com",
        "password": "uru585uyfhjf896tgtou",
        "bio": "",
        "avatar": "",
        "savedPrompts": [],
        "_id": "6693871856883733",
        "createdAt": "2025-09-08T11:47:17.933Z",
        "updatedAt": "2025-09-08T11:47:17.933Z",
        "__v": 0
    },
    "token": "eyJhkjsggjfglsgdj.kjsagi62249sdkhvfk.kasggigad"
}
```

---

### Logout User

**POST** `/user/logout`

**Description:** Logs out the current user (invalidate token).

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "message": "Logout successful"
}
```

---

### Get User Profile

**GET** `/user/profile`

**Description:** Returns the current user’s profile.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "user": {
        "_id": "68bda7efb71a4c2b696c32b7",
        "iat": 1757332159,
        "exp": 1757418559
    }
}
```

---

## 🔹 Prompt Routes

### Create Prompt

**POST** `/prompt/create`

**Description:** Create a new prompt.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
    "title":"test",
    "content":"here is the content means prompy",
    "tags":"frontned",
    "category":"tech",
    "isPublic":"true"
}
```

**Response:**

```json
{
    "message": "Prompt created successfully",
    "prompt": {
        "title": "test",
        "content": "here is the content means prompy",
        "owner": "68bda7efb71a4c2b696c32b7",
        "tags": [
            "frontned"
        ],
        "category": [
            "tech"
        ],
        "isPublic": true,
        "likes": [],
        "comments": [],
        "_id": "68bec387abc4592133855917",
        "createdAt": "2025-09-08T11:52:39.834Z",
        "updatedAt": "2025-09-08T11:52:39.834Z",
        "__v": 0
    }
}
```

---

### Get All Prompts

**GET** `/prompt/get-all`

**Description:** Fetch all prompts for the logged-in user.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "prompts": [
        {
            "_id": "68be55d4b406788366h0a",
            "title": "test",
            "content": "here is the content means prompy",
            "owner": {
                "_id": "68bda7efb71a4c2bhkd677",
                "username": "test",
                "email": "test@test.com",
                "password": "$2b$1Zv7/Z.ia",
                "bio": "",
                "avatar": "",
                "savedPrompts": [],
                "createdAt": "2025-09-07T15:42:39.117Z",
                "updatedAt": "2025-09-07T15:42:39.117Z",
                "__v": 0
            },
            "tags": [
                "frontned"
            ],
            "category": [
                "tech"
            ],
            "isPublic": true,
            "likes": [],
            "comments": [],
            "createdAt": "2025-09-08T04:04:36.725Z",
            "updatedAt": "2025-09-08T04:04:36.725Z",
            "__v": 0
        },
        {
            "_id": "68bec387abskd8996917",
            "title": "test",
            "content": "here is the content means prompy",
            "owner": {
                "_id": "68bda7efb71a4c2b696c32b7",
                "username": "test",
                "email": "test@test.com",
                "password": "$2b$10$QgDIJBSdoyq6VBZv7/Z.ia",
                "bio": "",
                "avatar": "",
                "savedPrompts": [],
                "createdAt": "2025-09-07T15:42:39.117Z",
                "updatedAt": "2025-09-07T15:42:39.117Z",
                "__v": 0
            },
            "tags": [
                "frontned"
            ],
            "category": [
                "tech"
            ],
            "isPublic": true,
            "likes": [],
            "comments": [],
            "createdAt": "2025-09-08T11:52:39.834Z",
            "updatedAt": "2025-09-08T11:52:39.834Z",
            "__v": 0
        }
    ]
}
```

---

### Get Prompt by ID

**GET** `/prompt/get/:id`

**Description:** Fetch a single prompt by its ID.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "prompt": {
        "_id": "68be55d4b96w0a",
        "title": "test",
        "content": "here is the content means prompy",
        "owner": {
            "_id": "68bda98639696c32b7",
            "username": "test",
            "email": "test@test.com",
            "password": "$2b$1yq6VBZv7/Z.ia",
            "bio": "",
            "avatar": "",
            "savedPrompts": [],
            "createdAt": "2025-09-07T15:42:39.117Z",
            "updatedAt": "2025-09-07T15:42:39.117Z",
            "__v": 0
        },
        "tags": [
            "frontned"
        ],
        "category": [
            "tech"
        ],
        "isPublic": true,
        "likes": [],
        "comments": [],
        "createdAt": "2025-09-08T04:04:36.725Z",
        "updatedAt": "2025-09-08T04:04:36.725Z",
        "__v": 0
    }
}
```

---

### Update Prompt

**PUT** `/prompt/update/:id`

**Description:** Update an existing prompt.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Updated Prompt Title",
  "content": "Updated content here"
}
```

**Response:**

```json
{
    "prompt": {
        "_id": "68be5598686479c47870a",
        "title": "test969",
        "content": "here is the content means prompy",
        "owner": "68bda7efbkgi95232b7",
        "tags": [
            "frontned"
        ],
        "category": [
            "tech"
        ],
        "isPublic": true,
        "likes": [],
        "comments": [],
        "createdAt": "2025-09-08T04:04:36.725Z",
        "updatedAt": "2025-09-08T11:58:07.261Z",
        "__v": 0
    }
}
```

---

### Delete Prompt

**DELETE** `/prompt/delete/:id`

**Description:** Delete a prompt by ID.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "message": "Prompt deleted successfully"
}
```

```

---

Do you want me to also **add error response examples** (like `401 Unauthorized`, `404 Not Found`, `500 Server Error`) to make it production-ready?
```

# Chatly Sequence Diagrams

The following diagrams describe the key backend and realtime interaction flows in this project.

## 1) User Signup

```mermaid
sequenceDiagram
    autonumber
    participant U as User (Frontend)
    participant API as Express API (/api/auth/signup)
    participant AJ as Arcjet Middleware
    participant C as Auth Controller
    participant DB as MongoDB (User)
    participant JWT as Token Utility
    participant E as Email Handler

    U->>API: POST /api/auth/signup { fullname, email, password }
    API->>AJ: Apply request protection
    AJ-->>API: Allow request
    API->>C: signup(req, res)

    C->>DB: User.findOne({ email })
    DB-->>C: Existing user? (none)

    C->>C: Validate fields/password/email format
    C->>C: Hash password (bcrypt)
    C->>DB: new User(...).save()
    DB-->>C: savedUser

    C->>JWT: generateToken(savedUser._id, res)
    JWT-->>U: Set jwt cookie

    C-->>U: 201 Created + user payload
    C->>E: sendWelcomeEmail(savedUser.email, ...)
```

## 2) User Login

```mermaid
sequenceDiagram
    autonumber
    participant U as User (Frontend)
    participant API as Express API (/api/auth/login)
    participant AJ as Arcjet Middleware
    participant C as Auth Controller
    participant DB as MongoDB (User)
    participant JWT as Token Utility

    U->>API: POST /api/auth/login { email, password }
    API->>AJ: Apply request protection
    AJ-->>API: Allow request
    API->>C: login(req, res)

    C->>DB: User.findOne({ email })
    DB-->>C: user document
    C->>C: bcrypt.compare(password, user.password)

    alt Credentials valid
        C->>JWT: generateToken(user._id, res)
        JWT-->>U: Set jwt cookie
        C-->>U: 200 OK + user payload
    else Invalid credentials
        C-->>U: 404 Invalid credentials
    end
```

## 3) Send Message + Realtime Delivery

```mermaid
sequenceDiagram
    autonumber
    participant S as Sender (Frontend)
    participant API as Express API (/api/messages/send/:id)
    participant AJ as Arcjet + ProtectedRoute
    participant MC as Message Controller
    participant UDB as MongoDB (User)
    participant CDB as Cloudinary
    participant MDB as MongoDB (Message)
    participant IO as Socket.IO Server
    participant R as Receiver (Frontend)

    S->>API: POST /api/messages/send/:receiverId { text?, image? }
    API->>AJ: arcjetProtection + protectedRoute
    AJ-->>API: Authenticated request
    API->>MC: sendMessage(req, res)

    MC->>UDB: User.findOne({ _id: receiverId })
    UDB-->>MC: Receiver exists

    opt Image included
        MC->>CDB: cloudinary.uploader.upload(image)
        CDB-->>MC: secure_url
    end

    MC->>MDB: new Message(...).save()
    MDB-->>MC: newMessage

    MC->>IO: getRecieverSocketId(receiverId)
    alt Receiver online
        IO-->>MC: socketId
        MC->>IO: io.to(socketId).emit("newMessages", newMessage)
        IO-->>R: newMessages event
    else Receiver offline
        IO-->>MC: undefined
    end

    MC-->>S: 201 Created + newMessage
```

## 4) Socket Connection Lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant F as Frontend Client
    participant IO as Socket.IO Server
    participant SM as Socket Auth Middleware
    participant MAP as userSocketMap
    participant ALL as All Connected Clients

    F->>IO: Connect handshake (with auth)
    IO->>SM: socketAuthMiddleware
    SM-->>IO: Attach socket.user & socket.userId

    IO->>MAP: userSocketMap[userId] = socket.id
    IO->>ALL: emit("getOnlineUsers", Object.keys(userSocketMap))

    F-->>IO: disconnect
    IO->>MAP: delete userSocketMap[userId]
    IO->>ALL: emit("getOnlineUsers", Object.keys(userSocketMap))
```

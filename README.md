## 2. Flow Overview (Signup)

[Client] → [POST /signup] → [Validation] → [Password Hash] → [Save User] → [Response]

## 3. Why each step matters

- **Validation** → Prevent bad/empty values, protect DB integrity

- **Hashing** → If DB leaks, passwords are unreadable

- **Save User** → Commit to MongoDB with Mongoose model

- **Response** → Tell client if success or failure, without leaking sensitive info

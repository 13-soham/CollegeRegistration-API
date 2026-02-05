# 🎓 College Academic Registration – Backend Assignment

⏱️ Time Limit: **1 Hour 30 Minutes**  
🛠️ Tech Stack: **Node.js, Express, MongoDB, Mongoose**  
🧪 Tools Allowed: **Postman, MongoDB Compass**

---

## 📌 RULES
- Build everything from scratch
- No copy-paste from previous projects
- Understand before coding
- Debug calmly if stuck

---

## 🧩 PROBLEM STATEMENT

Build a backend system for a **College Academic Registration System** where students can:
- Sign up & log in
- Register for courses
- View registered courses
- Drop courses
- Ensure secure and validated data handling

---

## 🛠️ TASK 1: Project Setup (10 mins)

1. Initialize Node.js project
2. Install required packages:
   - express
   - mongoose
   - dotenv
   - bcrypt
   - validator
3. Create Express server
4. Enable JSON body parsing middleware
5. **Do NOT start the server unless MongoDB is connected successfully**

---

## 🧠 TASK 2: Database Design (20 mins)

### 📘 Student Schema
Fields:
- name (String, required)
- email (String, required, unique, validate email)
- password (String, required, encrypted)
- rollNumber (String, required, unique)
- department (String, required)
- registeredCourses (Array of ObjectId referencing Course)
- createdAt (auto)

Requirements:
- Schema validation
- Data sanitization
- Proper error handling

---

### 📗 Course Schema
Fields:
- courseName (String, required)
- courseCode (String, required, unique)
- credits (Number, required)
- department (String, required)

---

## 🔐 TASK 3: Authentication APIs (20 mins)

### 🧑‍🎓 Student Signup
**POST /api/auth/signup**
- Validate email using validator
- Encrypt password using bcrypt
- Prevent duplicate email or rollNumber
- Save student to database

---

### 🔑 Student Login
**POST /api/auth/login**
- Validate email & password
- Compare encrypted password
- Return success or error message

---

## 📚 TASK 4: Course Management APIs (20 mins)

### ➕ Add Course
**POST /api/courses**
- Create a new course
- Validate required fields

---

### 📄 Get All Courses
**GET /api/courses**

---

## 📝 TASK 5: Academic Registration APIs (20 mins)

### 🧾 Register for a Course
**POST /api/students/:studentId/register**
- Use req.params for studentId
- Use req.body for courseId
- Prevent duplicate course registration
- Push course ObjectId into registeredCourses

---

### 📖 View Registered Courses
**GET /api/students/:studentId/courses**
- Populate registeredCourses with course details

---

### ❌ Drop a Course
**PATCH /api/students/:studentId/drop**
- Remove courseId from registeredCourses array

---

## 🛡️ TASK 6: Error Handling & Validation (10 mins)

- Use try–catch for all DB operations
- Send meaningful error responses
- Handle:
  - Invalid ObjectId
  - Missing fields
  - Duplicate data
  - Incorrect login credentials

---

## ⭐ BONUS (Optional)
- Prevent registering more than 5 courses
- Add query filter:
  GET /api/courses?department=CSE

---

## ✅ GOAL
Write backend code that you can:
- Explain confidently
- Debug calmly
- Improve later

---

## 🧠 REMINDER
Depth > Speed  
Understanding > Copying  
Consistency > Comparison
# HRConnect

HRConnect is a robust Employee Management System designed to streamline employee and task management processes. Built using modern web technologies, HRConnect incorporates role-based access control (RBAC) to ensure secure and efficient handling of organizational operations.

---

## Features

### Role-Based Access Control (RBAC)
HRConnect supports three primary roles, each with distinct permissions:

1. **Admin**:
   - Create user roles.
   - Add new roles.
   - Assign roles to employees (HR, Manager, Employee).

2. **HR (Human Resources)**:
   - **Create Employee Record**: Add new employees to the system.
   - **Read Employee Information**: View and search through employee profiles and records.

3. **Manager**:
   - **Assign Tasks**: Assign tasks to team members with deadlines and priorities.
   - **Read Employee Performance**: View available employees and their performance data.
   - **Update Task Status**: Change the status of tasks (e.g., "In Progress," "Completed").
   - **Delete Tasks**: Remove tasks from the system.

---

## Technology Stack

- **Frontend**: TypeScript, Next.js
- **Backend**: Nest.js
- **Authentication**: JWT (JSON Web Token) with Bearer Token for route protection
- **Database**: [Specify database used, e.g., PostgreSQL/MongoDB]
- **Styling**: [Specify styling library if applicable, e.g., Tailwind CSS/Material UI]

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/hrconnect.git
   cd hrconnect
   ```

2. **Install Dependencies**:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directories of both the frontend and backend.
   - Define the following variables:
     ```env
     # Frontend
     NEXT_PUBLIC_API_URL=http://localhost:5000

     # Backend
     DATABASE_URL=your_database_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Run the Application**:
   ```bash
   # Run backend
   cd backend
   npm run start:dev

   # Run frontend
   cd ../frontend
   npm run dev
   ```

5. **Access the Application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## API Endpoints

### Authentication
- **POST** `/auth/login`: User login and JWT generation.

### Admin Routes
- **POST** `/roles`: Create a new role.
- **POST** `/roles/assign`: Assign roles to employees.

### HR Routes
- **POST** `/employees`: Create a new employee record.
- **GET** `/employees`: Retrieve employee information.

### Manager Routes
- **POST** `/tasks`: Assign a task to a team member.
- **GET** `/tasks`: Retrieve all tasks.
- **PATCH** `/tasks/:id`: Update the status of a task.
- **DELETE** `/tasks/:id`: Delete a task.

---

## Usage Guidelines

### Admin
1. Log in to the system using admin credentials.
2. Navigate to the "Roles Management" section to create or assign roles.

### HR
1. Use the "Employee Management" section to add or search for employee records.

### Manager
1. Use the "Task Management" section to assign, update, or delete tasks.
2. View employee performance details from the "Performance" section.

---

## Security Measures
- **JWT Authentication**: Securely protect routes and user sessions.
- **Role-Based Access Control**: Restrict access to sensitive data and actions based on user roles.

---

## Future Enhancements
- Implement detailed employee performance tracking and analytics.
- Add notifications for task assignments and updates.
- Integrate with external payroll systems.
- Enhance UI/UX for a more seamless experience.

---

## 🧑‍💻 Author

Developed with ❤️ by **[NAJIB HOSSAIN](https://github.com/NajibHossain49) & [MD Tanvir islam](https://github.com/mdtanvirisl)**  
 

## 🌟 Show Your Support

If you like this project, please ⭐ the repository and share it with others!

---

## Contributions
Contributions are welcome! Please create a pull request or submit an issue if you have suggestions or find bugs.




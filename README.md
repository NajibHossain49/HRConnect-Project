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
- **Database**: Database used PostgreSQL
- **Styling**:  Styling library Tailwind CSS & DaisyUI

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/NajibHossain49/HRConnect.git
   cd HRConnect
   ```

2. **Install Dependencies**:
   ```bash
   # Install frontend dependencies
   cd Practice-Frontend
   npm install

   # Install backend dependencies
   cd ../Practice-Backend
   npm install
   ```

3. **Run the Application**:
   ```bash
   # Run backend
   cd Practice-Backend
   npm run start:dev

   # Run frontend
   cd Practice-Frontend
   npm run dev
   ```

5. **Access the Application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3444](http://localhost:3444)

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




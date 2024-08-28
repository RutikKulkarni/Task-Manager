# Task Manager

This is a web-based task management application similar to Trello. It allows users to manage their tasks through a board with columns representing different stages of task completion.

## Live URLs

- **Frontend:** [Live URL](https://task-manager-pi-mauve.vercel.app/)
- **Backend:** [Render URL](https://task-manager-habk.onrender.com/)
- **Backend URL:** [Vercel URL](https://task-manager-backend-orpin.vercel.app/)

## Features

- **User Authentication:**
  - Signup and login functionality using email and password
  - Secure password storage and user session management
  - **Settings Page:** Users can edit their name and password

- **Task Board:**
  - Users see their personal task board after logging in
  - The board has four columns: "To-Do", "In Progress", “Under Review”, and "Completed"

- **Task Management:**
  - Users can create, edit, and delete tasks in any column
  - Each task includes:
    - A title (mandatory)
    - A description (optional)
    - Status (automatically filled based on the column)
    - Priority (optional) - values: Low, Medium, Urgent
    - Deadline (optional)
  - **Search Functionality:** Users can search tasks by title using the search box

- **Drag and Drop Functionality:**
  - Move tasks between columns using drag and drop
  - Task status updates automatically when moved to a different column

- **Data Persistence:**
  - User data and tasks are stored in a database
  - Each user can only see and manage their own tasks
  
## Backend Routes

- **Authentication Routes:** `/api/auth`
- **Task Routes:** `/api`
- **User Routes:** `/api/user`

## Technologies Used

- **Frontend:** Next.js with TypeScript
- **Backend:** Node.js with Express
- **Database:** MongoDB

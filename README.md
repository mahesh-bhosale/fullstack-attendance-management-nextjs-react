Here's an updated version of the `README.md` file that includes the necessary `.env` information for Kinde and Neon PostgreSQL settings:

# Fullstack attendance management in nextjs react

# Attend Tracker
You can access the deployed version of the this app here:
[https://attend-tracker.vercel.app](https://attend-tracker.vercel.app)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Overview

This project tracks student attendance and provides a dashboard with various features for teachers.

### 1. Frontend:
- React.js
- Next.js
- Tailwind CSS
- ShadCN UI Components

### 2. Backend:
- Drizzle ORM
- Neon PostgreSQL
- Authentication via Kinde (for user login and social authentication)

### 3. Libraries & Utilities:
- Recharts Library
- ShadCN for additional UI components

### 4. Development Tools:
- IDE: Visual Studio Code (VS Code)
- Package Managers: Node.js (npm or yarn)

## Features

### 1. **Login Page**:
- Teachers can log in with their email ID and password to access the dashboard.
![image](https://github.com/user-attachments/assets/f48491fc-483a-45a1-9c8b-1ddf437a64c6)

### 2. **Dashboard Page**:
- Displays the percentage of students present or absent in a particular grade (standard) in a graphical format.
![image](https://github.com/user-attachments/assets/306c45e4-7602-4889-89e2-3f2c1d839718)

### 3. **Student Page**:
- Shows information about students such as their ID, name, address, and contact number. Teachers can also add or delete student records.
![image](https://github.com/user-attachments/assets/894c86d6-8f17-4257-9559-c302d7467153)

### 4. **Add New Student**:
- Allows teachers to add new students with basic details such as ID, name, address, and contact number.
![image](https://github.com/user-attachments/assets/8fc0b8e3-cd94-44d0-a222-30a44ed7e320)

### 5. **Delete Student**:
- Teachers can delete existing student records.
![image](https://github.com/user-attachments/assets/5dd75a09-3a90-49a4-8a50-24ed07867d5e)

### 6. **Attendance Page**:
- Teachers can mark attendance by selecting the date and grade. They can also modify previously marked attendance.
![image](https://github.com/user-attachments/assets/14e7f3ea-64df-4761-90e4-1cf7d086d53c)

### 7. **Generate Report**:
- Teachers can download an attendance report for students in a particular class. The report includes relevant attendance details.
![image](https://github.com/user-attachments/assets/723632b8-679c-4a59-81ee-eb2c959d2733)

### 8. **Settings Page**:
- Displays the teacher's information, including their name and email address.
![image](https://github.com/user-attachments/assets/c282452f-e738-4711-a2a6-c09e3e898ba5)

## Environment Variables

To run this project locally, create a `.env` file in the root of the project and add the following variables:

### Kinde Settings (Authentication):

```env
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your_kinde_issuer_url
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```

- Replace `your_kinde_client_id` with your actual Kinde Client ID.
- Replace `your_kinde_client_secret` with your actual Kinde Client Secret.
- Replace `https://your_kinde_issuer_url` with your Kinde Issuer URL.

### Neon PostgreSQL Database Settings:

```env
NEXT_PUBLIC_DATABASE_URL=postgresql://your_db_user:your_db_password@your_neon_db_host/your_db_name?sslmode=require
```

- Replace `your_db_user` with your Neon PostgreSQL username.
- Replace `your_db_password` with your Neon PostgreSQL password.
- Replace `your_neon_db_host` with the Neon database host URL (e.g., `ep-your-db-name.neon.tech`).
- Replace `your_db_name` with the name of your database.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

You can access the deployed version of the app here:
[https://attend-tracker.vercel.app](https://attend-tracker.vercel.app)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
```

### Key Points:

- The **Kinde Settings** section contains placeholders for the Kinde authentication details (Client ID, Client Secret, Issuer URL, and Redirect URLs).
- The **Neon PostgreSQL Database Settings** section provides a template for connecting to your Neon PostgreSQL database.
- Make sure to replace the placeholders in the `.env` file with your actual Kinde and Neon credentials.

This `.env` configuration ensures proper authentication and database connectivity in both local development and production environments.

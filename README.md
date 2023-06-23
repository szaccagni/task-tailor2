# Task Tailor
Built for the Software Engineering Super League (SESL)

Prompt: 
For this challenge, you are going to build a task tracker app. Your minimum requirements are:
* Create a task with a title, description, status (completed, in progress, etc.), and due date
* Edit and delete Tasks
* View all tasks, and sort by title, status, and due date
* Users can log in by entering their name and will only see their tasks. That means, I should be able to enter “Maya”, add tasks for Maya and only see Maya’s tasks when I enter that name, whenever I visit the Task Tracker App
* For this challenge, you are going to build a task tracker app. Your minimum requirements are:
Create a task with a title, description, status (completed, in progress, etc.), and due date
Edit and delete Tasks
View all tasks, and sort by title, status, and due date
Users can log in by entering their name and will only see their tasks. That means, I should be able to enter “Maya”, add tasks for Maya and only see Maya’s tasks when I enter that name, whenever I visit the Task Tracker App
As a user, I should be able to access my tasks from any device – that means, the data needs to be stored server-side.As a user, I should be able to access my tasks from any device – that means, the data needs to be stored server-side.


## Get started by clicking Sign In in the upper right hand corner
![get started](/public/signin-screenshot.png)

## New users should click Sign up at the bottom of this modal
![signup modal](/public/signIn-modal.png)

## Preview
![all tasks](/public/tasks-all.png)

## Technologies 
This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.com/)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io) 

Addional Technologies Used: 
- [zod](https://zod.dev/)
- [MUI](https://mui.com/)
- [dayjs](https://day.js.org/)

## Next Steps
* refactor code, utlizing the advantages of typescript more
* add conditional color styling based on due date and status
* resolve issue with time zones in production
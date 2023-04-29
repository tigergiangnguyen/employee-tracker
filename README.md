# 12 SQL: Employee Tracker

## Description

In this assignment, I was assigned to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL. In my application, I am using a "dotenv" package to hide MySQL username and password using a ".env" file. I did not do the bonus functionality as you will see only the ability to the acceptance criteria. This was also a good practice to link MySQL and Inquirer to see how it will run. This application is very useful to manage a company's employees and can be push further like seeing each department's hours worked, paychecks, revenue, etc. just by adding more tables.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Installations

These downloads are needed in order to run this application.

- Visual Studio Code
- Node.js
- MySQL

These Node Package Manager is what is needed to run the application!

- Console.table
- Inquirer
- Mysql2

## How to Run Application

1. Clone the application then once you open the code in Visual Code, Open in Integrated Terminal by right clicking on index.js
2. Make a connection to your SQL by typing in the terminal "mysql -u root -p" to log in into your account
3. Run this line of code to create the table "source db/schema.sql;"
4. Now run this line of code to insert the seeds into your table "source db/seeds.sql;"
5. Close the SQL connection because now you have your table with seeds inserted by running "quit;"
6. Finally run "node index.js" to start the connection to SQL and a inquirer prompt will appear to answer!

## Walkthrough Video

![Demo](./assets/Demo.gif)

Full Video Link: https://drive.google.com/file/d/1Q-qSdmyL4hvIeo7LVrb6WM-98OJyR2bz/view

## Credits

Tiger Nguyen (Me)


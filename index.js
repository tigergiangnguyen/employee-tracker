const inquirer = require('inquirer');
const table = require('console.table');
const db = require('./config/connection');

// A callback function that attempts to connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('connected as id' + db.threadId);
    afterConnection();
});

// Successfully connected to the database, console.log a welcome sign
afterConnection = () => {
    console.log('───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───')
    console.log('───█▒▒░░░░░░░░░▒▒█───')
    console.log('────█░░█░░░░░█░░█────')
    console.log('─▄▄──█░░░▀█▀░░░█──▄▄─')
    console.log('█░░█─▀▄░░░░░░░▄▀─█░░█')
    console.log('█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█')
    console.log('█░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█')
    console.log('█░░║║║╠─║─║─║║║║║╠─░░█')
    console.log('█░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█')
    console.log('█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█')
    startPrompt();
};

// Inquirer package that runs questions for the user to answer
function startPrompt() {
    inquirer
        .prompt({
            type: 'list',
            name: 'toDo',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        })
    // Depending what answer the user picks, 
    // run the function related to the choice
    .then(answer => {
        switch (answer.toDo) {
        case 'View All Employees':
            viewAllEmployees();
          break;
        case 'Add Employee':
            addEmployee();
          break;
        case 'Update Employee Role':
            updateEmployee();
          break;
        case 'View All Roles':
            viewRoles();
          break;
        case 'Add Role':
            addRole();
          break
        case 'View All Departments':
            viewDepartments();
          break;
        case 'Add Department':
            addDepartment();
          break;
        case 'Quit':
            db.end();
          break;
        }
    });
};


function viewAllEmployees() {
  // SQL query string that selects employee then joins the table together
  const mySql = `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
  FROM employee e
  LEFT JOIN role r ON e.role_id = r.id
  LEFT JOIN department d ON r.department_id = d.id
  LEFT JOIN employee m ON e.manager_id = m.id;
  `;
  // Calls the query string and If an error occurs,
  // throw the error
  db.query(mySql, (err, res) => {
      if (err) throw err;
      console.log('===============');
      console.table(res);
      startPrompt();
  });
};

function addEmployee() {
  db.query('SELECT id, title FROM role', (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    // Calls results array and returns a new array of objects
    const roles = results.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    db.query(
      'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
      (error, results) => {
        if (error) {
          console.error(error);
          return;
        }

    const managers = results.map(({ id, name }) => ({
      name,
      value: id,
    }));
    
    inquirer
      .prompt([
        {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of employee:',
        },
        {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of employee:',
        },
        {
        type: 'list',
        name: 'roleId',
        message: 'Select the employee role:',
        choices: roles,
        },
        {
        type: 'list',
        name: 'managerId',
        message: 'Select the employee manager:',
        choices: [
        { name: 'None', value: null },
        ...managers,
      ],
    },
  ])
  .then((answers) => {
    const MySql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      // Insert new values and run SQL query
      const values = [
        answers.firstName,
        answers.lastName,
        answers.roleId,
        answers.managerId,
    ];
    db.query(MySql, values, (error) => {
      if (error) {
        console.error(error);
      return;
      }
      console.log('A new employee added!');
      startPrompt();
    });
  })
  .catch((error) => {
  console.error(error);
  });
  }
  );
});
};

function updateEmployee() {
  const mySql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id';
  const MySqlRole = 'SELECT * FROM role';
  db.query(mySql, (err, resEmployees) => {
    if (err) throw err;
      db.query(MySqlRole, (err, resRoles) => {
        if (err) throw err;
          inquirer
              .prompt([
                  {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee to update:',
                    // Using map to change an array of employee objects
                    // into an array of formatted employee names
                    choices: resEmployees.map(
                      (employee) =>
                        `${employee.first_name} ${employee.last_name}`
                    )
                  },
                  {
                    type: 'list',
                    name: 'role',
                    message: 'Select the new role:',
                    // Change an array of role objects into an array
                    // of title strings
                    choices: resRoles.map((role) => role.title)
                  },
          ])
          .then(answers => {
            // Search for the employee objects in the array
            // with first_name and last_name properties matches the
            // select employee name
            const employee = resEmployees.find (
              (employee) =>
                `${employee.first_name} ${employee.last_name}` === answers.employee
            );
            const role = resRoles.find (
              (role) => role.title === answers.role
            );
            // Update the role column
            const query =
              'UPDATE employee SET role_id = ? WHERE id = ?';
            db.query (query, [role.id, employee.id],
              (err, res) => {
              if (err) throw err;
                console.log(
                  `${employee.first_name} ${employee.last_name}'s new role to ${role.title} has been updated!`
                );
                startPrompt();
                }
              );
            });
          });
        });
      };

function viewRoles() {
  const query = 'SELECT role.title, role.id, department.department_name, role.salary from role join department on role.department_id = department.id';
  db.query(query, (err, res) => {
    if (err) throw err;
      console.table(res);
      startPrompt();
  });
};

function addRole() {
  const query = 'SELECT * FROM department';
  db.query(query, (err, res) => {
    if (err) throw err;
      inquirer
          .prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Enter the title of the new role:'
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter the salary of the new role:'
            },
            {
              type: 'list',
              name: 'department',
              message: 'Select the department for the new role:',
              choices: res.map((department) => department.department_name
              ),
            }
    ])
    .then((answers) => {
      // Find department column with id
      const department = res.find((department) => department.department_name === answers.department
      );
      console.log(res);
      const query = 'INSERT INTO role SET ?';
        // Create a new role with inserting new values in title, salary,
        // and department
        db.query(query,
          {
            title: answers.title,
            salary: answers.salary,
            department_id: department.id
          },
          (err, res) => {
            if (err) throw err;
              console.log(
                `Added ${answers.title} to the role database!`
            );
      startPrompt();
      }
    );
  });
});
};

function viewDepartments() {
  const query = 'SELECT * FROM department';
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function addDepartment() {
  inquirer
      .prompt({
          type: 'input',
          name: 'name',
          message: 'Enter the name of the new department:',
      })
      .then((answer) => {
          const query = `INSERT INTO department (department_name) VALUES ('${answer.name}')`;
          db.query(query, (err, res) => {
              if (err) throw err;
              console.log(`Added ${answer.name} to the department database!`);
              startPrompt();
      });
  });
};

// Event listener to close SQL connection
process.on('Quit', () => {
  db.end();
});
const inquirer = require('inquirer');
const table = require('console.table');
const db = require('../config/connection');


// db.connect(err => {
//     if (err) throw err;
//     console.log('connected as id' + db.threadId);
//     afterConnection();
// });

// afterConnection = () => {
//     console.log(`
//     ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
//     ───█▒▒░░░░░░░░░▒▒█───
//     ────█░░█░░░░░█░░█────
//     ─▄▄──█░░░▀█▀░░░█──▄▄─
//     █░░█─▀▄░░░░░░░▄▀─█░░█
//     █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
//     █░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█
//     █░░║║║╠─║─║─║║║║║╠─░░█
//     █░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█
//     █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
//     `)
//     startPrompt();
// };

const startPrompt = () => {
    inquirer
        .prompt([
        {
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
        }
    ])
    .then(choices => {
        const nextPrompt = choices.toDo;
        if (nextPrompt === 'View All Employees') {
            viewAllEmployees();
        };
        if (nextPrompt === 'Add Employee') {
            addEmployee();
        };
        if (nextPrompt === 'Update Employee Role') {
            updateEmployee();
        };
        if (nextPrompt === 'View All Roles') {
            viewRoles();
        };
        if (nextPrompt === 'Add Role') {
            addRole();
        }
        if (nextPrompt === 'View All Departments') {
            viewDepartments();
        };
        if (nextPrompt === 'Add Department') {
            addDepartment();
        };
        if (nextPrompt === 'Quit') {
            process.quit();
        };
    })
};

const viewAllEmployees = () => {
  const mySql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, roles.salary AS salary, departments.name AS department, CONCAT (manager.first_name, '', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id`;
  db.query(mySql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('\n');
    console.table(rows);
    return startPrompt();
  });
};

const addEmployee = () => {
  return inquirer.prompt([
  {
    type: 'input',
    name: 'firstName',
    message: 'What is the first name of the employee?',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Enter a first name');
        return false;
        };
      }
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'What is the last name of the employee',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Enter a last name');
        return false;
      };
      }
    }
  ])
  .then (choice => {
    const params = [choice.firstName, choice.lastName];
    const mySql = `SELECT * FROM roles`;
    db.query(mySql, (err, rows) => {
      if (err) {
        throw err;
    }
    const role = rows.map(({title, id}) => ({name: title, value: id}));
      inquirer.prompt([
        {
          type: 'list',
          name: 'role',
          message: 'What is the role of this employee?',
          choices: role
        }
      ])
      .then(roleChoice => {
        const role = roleChoice.role;
        params.push(role);
        const MySql = `SELECT * FROM employees`;
        db.query(MySql, (err, rows) => {
          if (err) {
            throw err;
          }
            const manager = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
            manager.push({name: 'No manager', value: null});
            inquirer.prompt([
            {
              type: 'list',
              name: 'manager',
              message: 'Who manger is this employee?',
              choices: manager
            }
            ])
            .then(managerChoice => {
              const manager = managerChoice.manager;
              params.push(manager);
              const MySql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
              db.query(MySql, params, (err) => {
                if (err) {
                  throw err;
                }
                console.log('An employee was added!');
                return viewAllEmployees();
            });
        });
        });
    });
    });
});
};

const updateEmployee = () => {
  const MySql = `SELECT first_name, last_name, id FROM employees`
    db.query(MySql, (err, rows) => {
      if (err) {
        throw err;
      }
      const employee = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which employee would you like to update?',
          choices: employee
        }
      ])
      .then(employeeChoice => {
        const employee = employeeChoice.employee;
        const params = [employee];
        const MySql = `SELECT title, id FROM roles`;
        db.query(MySql, (err, rows) => {
          if (err) {
            throw err;
        }
        const role = rows.map(({title, id}) => ({name: title, value: id}));
          inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: 'What is the new role of this employee?',
              choices: role
            }
        ])
        .then(rolesChoice => {
          const role = rolesChoice.role;
          params.unshift(role);
          const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
          db.query(sql, params, (err) => {
            if (err) {
              throw err;
            }
            console.log('Updated an Employee!');
            return viewAllEmployees();
          });
        });
      });
    });
  });
};

const viewRoles = () => {
  const MySql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;
  db.query(MySql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('\n');
    console.table(rows);
    return startPrompt();
  });
};

const addRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of this role?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Enter a role name');
          return false;
        };
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
      validate: salaryInput => {
        if (isNaN(salaryInput)) {
          console.log('Enter a salary');
          return false;
        } else {
          return true;
        };
      }
    }
  ])
  .then (choice => {
    const params = [choice.title, choice.salary];
    const MySql = `SELECT * FROM departments`;
    db.query(MySql, (err, rows) => {
      if (err) {
        throw err;
      }
      const department = rows.map(({name, id}) => ({name: name, value: id}));
      inquirer.prompt([
        {
          type: 'list',
          name: 'department',
          message: 'What department does this role belong to?',
          choices: department
        }
      ])
      .then(departmentChoice => {
        const department = departmentChoice.department;
        params.push(department);
        const MySql = `INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?)`;
        db.query(MySql, params, (err) => {
          if (err) {
            throw err;
          }
          console.log('Added role!');
          return viewRoles();
        });
      });
    });
  });
};

const viewDepartments = () => {
  const MySql = `SELECT * FROM departments`;
    db.query(MySql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.log('\n');
      console.table(rows);
      return startPrompt();
  });
};

const addDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of this department?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Enter a department name');
          return false;
        };
      }
    }
  ])
  .then(answer => {
    const MySql = `INSERT INTO departments (name)
      VALUES (?)`;
    const params = answer.name;
    db.query(MySql, params, (err) => {
      if (err) {
        throw err;
      }
      console.log('Added a department!');
      return viewDepartments();
    });
  });
};

module.exports = startPrompt;
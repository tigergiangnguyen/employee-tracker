USE employee_db;

INSERT INTO department (id, department_name) VALUES 
(1, 'Valet'),
(2, 'House Keeping'),
(3 'Engineering'),
(4, 'Front Desk'),
(5, 'Sales'),
(6, 'Angelines'),
(7, 'Merchant & Trade');

INSERT INTO employee_roles (id, title, salary, department_id) VALUES
(1, 'GSC', 30000, 1),
(2, 'Valet Manager', 45000, 1),
(3, 'House Keeping', 25000, 2),
(4, 'House Keeping Manager', 45000, 2),
(5, 'Engineer', 55000, 3),
(6, 'Engineer Manager', 60000, 3),
(7, 'Sales', 45000, 5),
(8, 'Sales Manager', 60000, 5),
(9, 'Front Desk', 35000, 4),
(10, 'Front Desk Manager', 55000, 4),
(11, 'Server', 45000, 6),
(12, 'Angelines Manager', 65000, 6),
(13, 'Bartender', 60000, 7),
(14, 'M&T Manager', 70000, 7);

INSERT INTO employee (id, first_name, last_name, role_id) VALUES
(1, 'Jaden', 'Hall', 1),
(2, 'Jarred', 'Campbell', 2),
(3, 'Carmen', 'Perez', 3),
(4, 'Tommy', 'White', 4),
(5, 'Frank', 'Cruz', 5),
(6, 'Chris', 'Barnes', 6),
(7, 'Noah', 'Cooks', 7),
(8, 'Kim', 'Cole', 8),
(9, 'Cody', 'Free', 9),
(10, 'Anthony', 'Dwell', 10),
(11, 'Brittney', 'Cast', 11),
(12, 'Kevin', 'Le', 12),
(13, 'Sam', 'Collins', 13),
(14, 'Amanda', 'Yerns', 14);
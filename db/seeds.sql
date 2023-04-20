USE employee_db;

INSERT INTO department (department_name) VALUES 
('Valet'),
('House Keeping'),
('Engineering'),
('Front Desk'),
('Sales'),
('Angelines'),
('Merchant & Trade');

INSERT INTO employee_roles (title, salary, department_id) VALUES
('GSC', 30000, 1),
('Valet Manager', 45000, 1),
('House Keeping', 25000, 2),
('House Keeping Manager', 45000, 2),
('Engineer', 55000, 3),
('Engineer Manager', 60000, 3),
('Sales', 45000, 5),
('Sales Manager', 60000, 5),
('Front Desk', 35000, 4),
('Front Desk Manager', 55000, 4),
('Server', 45000, 6),
('Angelines Manager', 65000, 6),
('Bartender', 60000, 7),
('M&T Manager', 70000, 7);

INSERT INTO employee (first_name, last_name, role_id) VALUES
('Jaden', 'Hall', 1),
('Jarred', 'Campbell', 2),
('Carmen', 'Perez', 3),
('Tommy', 'White', 4),
('Frank', 'Cruz', 5),
('Chris', 'Barnes', 6),
('Noah', 'Cooks', 7),
('Kim', 'Cole', 8),
('Cody', 'Free', 9),
('Anthony', 'Dwell', 10),
('Brittney', 'Cast', 11),
('Kevin', 'Le', 12),
('Sam', 'Collins', 13),
('Amanda', 'Yerns', 14);
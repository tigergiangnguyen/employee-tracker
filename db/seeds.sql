USE employee_db;

INSERT INTO department (department_name) VALUES 
('Valet'),
('House Keeping'),
('Engineering'),
('Front Desk'),
('Sales'),
('Angelines'),
('Merchant & Trade');

INSERT INTO role (title, salary, department_id) VALUES
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

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES

('Jarred', 'Campbell', 2, NULL),
('Tommy', 'White', 4, NULL),
('Chris', 'Barnes', 6, NULL),
('Kim', 'Cole', 8, NULL),
('Anthony', 'Dwell', 10, NULL),
('Kevin', 'Le', 12, NULL),
('Amanda', 'Yerns', 14, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jaden', 'Hall', 1, 1),
('Carmen', 'Perez', 3, 2),
('Frank', 'Cruz', 5, 3),
('Noah', 'Cooks', 7, 4),
('Cody', 'Free', 9, 5),
('Brittney', 'Cast', 11, 7),
('Sam', 'Collins', 13, 6);
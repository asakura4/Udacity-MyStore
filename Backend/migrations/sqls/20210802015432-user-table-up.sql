/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    password VARCHAR(150)
);


INSERT INTO users (firstName, lastName, password) VALUES ('firstA', 'lastA', 'dummypA') RETURNING *;
INSERT INTO users (firstName, lastName, password) VALUES ('firstB', 'lastB', 'dummypB') RETURNING *;
INSERT INTO users (firstName, lastName, password) VALUES ('firstC', 'lastC', 'dummypC') RETURNING *;
INSERT INTO users (firstName, lastName, password) VALUES ('firstD', 'lastD', 'dummypD') RETURNING *;

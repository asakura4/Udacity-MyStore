/* Replace with your SQL commands */
CREATE TABLE product (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(150),
    price numeric,
    category VARCHAR(100)
);


INSERT INTO product (name, price, category) VALUES ('prodA', 4, 'FOOD') RETURNING *;
INSERT INTO product (name, price, category) VALUES ('prodB', 10, 'FOOD') RETURNING *;
INSERT INTO product (name, price, category) VALUES ('prodC', 5, 'FOOD') RETURNING *;

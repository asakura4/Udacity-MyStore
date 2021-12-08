/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id bigint REFERENCES users(id),
    status VARCHAR(150)
);


INSERT INTO orders(user_id, status) VALUES (1, 'active') RETURNING *;
INSERT INTO orders(user_id, status) VALUES (1, 'active') RETURNING *;
INSERT INTO orders(user_id, status) VALUES (3, 'active') RETURNING *;
INSERT INTO orders(user_id, status) VALUES (3, 'completed') RETURNING *;
INSERT INTO orders(user_id, status) VALUES (4, 'active') RETURNING *;


/*
INSERT INTO orders(product_id, quantity, user_id, status) VALUES (1, 10, 1, 'active') RETURNING *;
INSERT INTO orders(product_id, quantity, user_id, status) VALUES (1, 5, 1, 'active') RETURNING *;
INSERT INTO orders(product_id, quantity, user_id, status) VALUES (1, 2, 4, 'active') RETURNING *;
INSERT INTO orders(product_id, quantity, user_id, status) VALUES (1, 2, 4, 'active') RETURNING *;
INSERT INTO orders(product_id, quantity, user_id, status) VALUES (3, 2, 2, 'active') RETURNING *;
INSERT INTO orders(product_id, quantity, user_id, status) VALUES (1, 10, 2, 'active') RETURNING *;
INSERT INTO orders(product_id, quantity, user_id, status) VALUES (1, 10, 3, 'completed') RETURNING *;
*/
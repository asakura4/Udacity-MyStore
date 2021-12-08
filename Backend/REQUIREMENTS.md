# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: \
GET /product
- Show: /product/:id \
GET /product/:id &nbsp; (parameter: id)
- Create  \
POST /product &nbsp;&nbsp;(args: Product) &nbsp;[token required]
- [OPTIONAL] Top 5 most popular products \
Not implement \
- [OPTIONAL] Products by category (args: product category \
GET /product/category/:category&nbsp; (parameter: category)

#### Users
- Index \
GET /user 
- Show \
GET /user/:id &nbsp; (parameter: id)&nbsp;[token required]
- Create  \
POST /user &nbsp;(args: User) &nbsp;[token required]

#### Orders
- Current Order by user \
GET /order/currentOrder/:id &nbsp; (parameter: user id) &nbsp;[token required]
- [OPTIONAL] Completed Orders by user \
GET /order/completedOrder/:id &nbsp;(args: user id) &nbsp;[token required]
- [NEW] Completed order \
PUT /order/complete &nbsp; (args: user id, order id) &nbsp;[token required]
- [NEW] Create order \
POST /order &nbsp; (args: order) &nbsp;[token required]
- [NEW] Add product to existing order \
POST /order/:id/addProducts &nbsp; (parameter: order id, args: quantity, product id) &nbsp;[token required]


## Database schema
#### product
- id SERIAL PRIMARY KEY
- name VARCHAR(150)
- price numeric
- category VARCHAR(100)

#### user
- id SERIAL PRIMARY KEY
- firstName VARCHAR(150)
- lastName VARCHAR(150)
- password VARCHAR(150)

#### orders
- id SERIAL PRIMARY KEY
- user_id bigint REFERENCES users(id),
- status VARCHAR(150)


#### order_products
- id SERIAL PRIMARY KEY  
- quantity integer,
- order_id bigint REFERENCES orders(id),
- product_id bigint REFERENCES products(id)



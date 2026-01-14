1. Simple Inventory Management API

This project is a REST API built with NestJS and SQLite.
It allows users to create, read, update, and delete products in an inventory.

Technologies Used

NestJS

SQLite

TypeORM

class-validator

class-transformer

Product Fields

Each product has the following fields:

id – auto-generated number

name – required, minimum 3 characters

description – optional

price – must be greater than 0

quantity – must be 0 or more

createdAt – auto-generated

updatedAt – auto-updated

API Endpoints
Create a Product

POST /products

Get All Products

GET /products

Optional filters:

minPrice

maxPrice

inStock

Get Product by ID

GET /products/:id

Returns 404 if not found.

Update Product

PUT /products/:id

Partial updates allowed

Returns 404 if product does not exist

Delete Product

DELETE /products/:id

Returns success message

Returns 404 if product does not exist

Validation & Errors

All inputs are validated using DTOs

Invalid input returns 400 Bad Request

Missing products return 404 Not Found

NestJS exceptions are used

How to Run the Project
npm install
npm run start:dev


The API will run on:

http://localhost:3000

 2. Purpose of This Project

This project was built to demonstrate backend engineering fundamentals, not just CRUD functionality.

It shows:

Clean NestJS architecture

Proper validation

Clear separation of responsibilities

Defensive error handling

Architectural Decisions
Why Controllers, Services, and DTOs?

Controllers handle HTTP requests only

Services contain business logic

DTOs define and validate input data

This prevents logic from being mixed together and makes the code easier to test and maintain.

Why DTO Validation?

DTOs ensure:

Only valid data reaches the service layer

Errors are caught early

The API is predictable and safe

Why SQLite?

Easy to set up

No external database required

Ideal for small projects and assessments

Why TypeORM?

Works well with NestJS

Uses decorators that match NestJS style

Supports migrations and repositories

Error Handling Philosophy

No silent failures

No returning null

Every error has a clear HTTP status

Uses NestJS built-in exceptions instead of generic errors

 3. Sample curl & Postman Examples
Create Product
curl
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{
  "name": "Keyboard",
  "description": "Mechanical keyboard",
  "price": 99,
  "quantity": 10
}'

Get All Products
curl
curl http://localhost:3000/products/all

With Filters
curl "http://localhost:3000/products/all?minPrice=50&inStock=true"

Get Product by ID
curl
curl http://localhost:3000/products/1


If the product does not exist:

{
  "statusCode": 404,
  "message": "Product not found"
}

Update Product
curl
curl -X PUT http://localhost:3000/products/1 \
-H "Content-Type: application/json" \
-d '{
  "price": 120,
  "quantity": 5
}'

Delete Product
curl
curl -X DELETE http://localhost:3000/products/1


Response:

{
  "message": "Product deleted successfully"
}

Postman Tips

Method: select correct HTTP method (POST, GET, PUT, DELETE)

URL: http://localhost:3000/products

Headers:

Content-Type: application/json

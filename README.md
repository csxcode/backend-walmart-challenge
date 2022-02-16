# Backend Walmart Challenge (Palindrome) 🔥

This code was developed in order to do the challenge of test of full-stack-developer for walmart using node (typescript), mongodb as database, clean code and clean architecture and deploy with docker.


## Installation

First of all we need to set up the .env file, in this case this file already exists but it is only for test purpose, in production cases or another environnments this file must not be upload to the repository.

Currently this file content:

```txt
NODE_ENV=development
SERVER_PORT=3040
DB_HOST=mongodb
DB_PORT=27017
DB_DATABASE=walmart_challenge
DB_USER=developer
DB_PASSWORD=developer
```


### Docker Compose

Run the below commands inside the root project:

> First, create the containers: 

```console
make docker-build
```

> Second, import products from json.file to mongodb: 

```console
make import-data
```

> Finally, in any internet explorer go to:

`localhost:3040/products/search`

<br>

> Also, to try the service (endpoint) with different filters, go to the file requests.http what is found in the root project and run the requests.

> *requests.http file:*
```console
@api = http://localhost:3040

### Get all products without any filters (paginated)
GET {{api}}/products/search


### Get all product of page 2 with a limit of 5 (paginated)
GET {{api}}/products/search?page=2&limit=5


### Get product by ID of palindrome type (only one by ID)
GET {{api}}/products/search?id=121


### Get products by brand or description of palindrome type
GET {{api}}/products/search?search=adda


### Get products by brand or description without be palindrome
GET {{api}}/products/search?search=nvnac


### Get product by ID without be palindrome
GET {{api}}/products/search?id=300
```
> To try this you should use vscode and the extention REST CLIENT


<br>
> In case that you want to remove the containers, run:

```console
make docker-down
```



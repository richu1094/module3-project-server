# module2-project

## PAYING routes

Base URL: `/api/pay` 

| METHOD | PATH                    | DESCRIPTION                                 | ESTADO |
|--------|-------------------------|---------------------------------------------|--------|
| POST   | `/pay/createCustomer`   | Crear un nuevo cliente                      |        | 
| POST   | `/pay/createPayment`    | Crear un nuevo pago                         |        | 
| GET    | `/plan/:projectId`      | Obtener todos los elementos de un proyecto  |        | 
| GET    | `/plan/:id`             | Obtener un elemento por ID                  |        |
| POST   | `/plan/create`          | Crear un nuevo elemento                     |        | 
| PUT    | `/plan/:id`             | Actualizar un elemento por ID               |        | 
| DELETE | `/plan/:id`             | Eliminar un elemento por ID                 |        | 
| GET    | `/project/all`          | Obtener todos los proyectos                 |        |
| GET    | `/project/:id`          | Obtener un proyecto por ID                  |        | 
| POST   | `/project/create`       | Crear un nuevo proyecto                     |        | 
| PUT    | `/project/:id`          | Actualizar un proyecto por ID               |        | 
| DELETE | `/project/:id`          | Eliminar un proyecto por ID                 |        | 
| GET    | `/user/:id`             | Obtener un usuario por ID                   |        | 


Auth Roles
| METHOD | PATH                     | DESCRIPTION                                | ESTADO |
|--------|--------------------------|--------------------------------------------|--------|
| POST   |`/login`                  | Página principal                           |        | 
| POST   |`/signup`                 | Página para registro                       |        | 
| GET    |`/verify`                 | Post del registro a la DB                  |        | 
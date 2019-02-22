# Developing-DB
Testing and developing the backend of the project.

But "node_modules" folder is not included so you'll need to install it.

### Installing node_modules
To install, run the next code
```
npm install
```
* Express
* Moment.js
* Mongoose
* Morgan
* Nodemon (As devDependency)

### Running the project
After intall, use this command for run the project
```
npm run dev
```
### Routes
* Users

http://localhost:3000/api/users
* Projects

http://localhost:3000/api/projects
* Activities

http://localhost:3000/api/activities

### Methods
* Get

    Get all the objects
* Get/:id

    Get an object by id
* Post

    Add an object
* Put/:id

    Edit an object by id
* Delete/:id

    Delete an object by id
### Postman
Please use postman for do the requests, here is the file that contains the actions [postmanActions.postman_collection.json](https://github.com/Reverse117/developing-db/blob/master/postmanActions.postman_collection.json)

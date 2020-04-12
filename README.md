# Spotback User-Service backend

This is a **Node.js** & **Express** app made with **Typescript** and will handle CRUD functions.

* [create function](endpoints/create.md)
* [read function](endpoints/read.md)
* [update function](endpoints/update.md)
* [delete function](endpoints/delete.md)
    

## Deploying and Running

To run/deploy this example you will need to install [Node.js](https://nodejs.org/en/)
After you are done here are the necessary commands.

## First

```sh
$ npm install
```
## Second

```sh
$ npm run start
```
## Local development

```sh
$ npm run start:dev

$ docker build -t spotback/user-service:x.x.x .

$ docker run -p 127.0.0.1:8080:3000 spotback/user-service:x.x.x

$ docker push spotback/user-service:1.0.2
```
After this you should have your Lambda service up and running.
You can find a blog post about this example [here](http://lazarbulic.com/blog/?p=154&preview=true).

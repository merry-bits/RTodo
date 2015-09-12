# To Do web app in React

A simple page where you can manage a list of todos, implemented using React.
Todos can be added, marked as done and be removed from the list after that.

The page was made for mobile first and changes slightly for screens bigger than
1280 pixels.


## Install and run

Enter the project directory and us npm to install a http server:
```bash
    $ npm install
```

Now the server can be started with:
```bash
    $ node_modules/http-server/bin/http-server src
```
The server delivers the files and the todo application can be reached on:

[http://localhost:8080/client/](http://localhost:8080/client/)


# Solution

The single page application resides in `src/app/todos.jsx`. It consists of the
top React class `Todos` which owns all data and renders out the form for new
elements and the list of existing ones. The list owns then the single todo
elements which react to user imputs (check, remove) and call back up the
hirarchy when something should happen.


## Storage

The solution is client side only, no server calls are implemented. Some parts
of the code are marked with `TODO:` and indicate where such calls could be added
in order to support storing the todo entries on a server.

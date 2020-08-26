# Taskmaster 1.0

## Overview

This is a simple todo app where you can add/remove/modify tasks on a tasklist.
It is written in angular 10

## Features
1) create a task with a title and optional description
2) edit a task
3) delete a task
4) complete a task
5) see a list of tasks


## how to start the application

1) to install the dependencies run `npm run init`.
2) to run both frontend and bakcend part, run `npm run dev`
3) go to `http://localhost:4200`


## Implementation

During the development I attempted towards simplicity. I've created 3 main component for the taskmaster. A `task list` which contains `task items` and a `form` to add/edit the tasks. One servce is responsible for the backend connection.
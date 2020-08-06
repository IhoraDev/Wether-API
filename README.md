# Configuration

To run this code it is necessary to install the NodeJS library, download here: https://nodejs.org/en/download/

The implementation includes the NodeJS modules bellow:
```
*const express = require('express');
*const path = require('path');
*const bodyParser = require('body-parser');
*const mysql = require('mysql');
*const fs = require('fs');

```
If you do not have the following module, you will need to perform the installation using the commands.

To install the necessary module just follow the steps below, in NodeJS terminal:

```
# Install express module
$ npm install express

# Install path module
$ npm install path

# Install body-parser module
$ npm install body-parser

# Install mysql module
$ npm install mysql

# Install fs module
$ npm install fs
```

# Mysql Database

Here, at the root of the project, there is an SQL file that contains a table implemented for record or history. 
With name "BD_mySQL.sql".

Before uploading the table, it is necessary to create the database with the name "testenode". 
To do so, simply run the following MySQL commands:

```
CREATE DATABASE testenode;
```

To upload the table, just run in the terminal:

```
mysql -u username -p testenode < BD_mySQL.sql
```

To change the data base settings, such as login, flock name, etc. Just change the following excerpt in the "server.js" file:

```
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1",
  database: "testenode"
});
```

# How to Use

To run the app, just start the virtual server in the NodeJS terminal, as shown below:

```
node server.js
``` 

After accessing the local server in the browser through the configured port: http://localhost:8080/

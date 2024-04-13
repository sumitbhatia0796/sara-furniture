'use strict';
const app = require('./app');

const chalk = require('chalk');

require('dotenv').config();
const db =  require("./db/config"); 
app.set('port', process.env.PORT);
app.set('message', process.env.MESSAGE);
db.connectDB();
const port = app.get('port');
const message = app.get('message');

app.listen(port, () => {
  console.log(chalk.blue(`${message} ${port}`));
});
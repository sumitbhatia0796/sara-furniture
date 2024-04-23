'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const {initialize} = require('express-openapi');
const yaml = require('js-yaml');
const fs = require('fs');
const path  = require('path');
const options = require("./config/options");
const  mongoose  = require('mongoose');

const app = express();

const DB_HOST = options.db.host;
const DB_NAME = options.db.name;
const DB_USERNAME = options.db.username;
const DB_PASSWORD = options.db.password;
const DB_CONFIG_STRING = options.db.configString;
const DB_SSL = options.db.useSSL;

const PORT = options.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

app.use(helmet());
app.use(express.static(__dirname + '/src/public'));

const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname,'/api/swagger.yaml'),'utf8'))

/* Swagger */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api-docs',express.static(path.join(__dirname,'api/swagger.yaml')));
app.get('/', (req, res, next) => res.redirect('api'));

//Initialize Swagger Express

initialize({
  app,
  apiDoc: `${__dirname}/api/swagger.yaml`,
  operations: require('./controllers/operations'),
  validateApiDoc: false
})

/* Routes */
// const valueRoutes = require('./routes/user');
// const productHomeRoutes = require('./routes/productHome');
// const productRoutes = require('./routes/product');

// app.use('/', valueRoutes);
// app.use('/', productHomeRoutes);
// app.use('/', productRoutes);

let dbAuth =''; let dbConfig ='';
if(!!DB_USERNAME && !!DB_PASSWORD){
  dbAuth =DB_USERNAME + ':' + DB_PASSWORD + '@';
  if(!!DB_CONFIG_STRING) dbConfig =DB_CONFIG_STRING;
}
let dbSSL = (DB_SSL) ? '+srv': '';

mongoose.connect(`mongodb${dbSSL}://${dbAuth}${DB_HOST}/${DB_NAME}${dbConfig}`)
        .then(()=>{ console.log("MongoDB connected....."); app.emit('ready')})
        .catch((err)=>{ console.log("Could not connect to MongoDB. Terminating....."); console.log(err); process.emit()});

app.on('ready', function(){
  app.listen(PORT, function(){
    console.log("Listening on:" +PORT);
  });
})

module.exports = app;
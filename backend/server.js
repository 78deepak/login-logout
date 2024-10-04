const express = require('express')
const app = express()
require('./models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const model = require('../backend/models/User')
const ProductRouter = require('../backend/Routes/ProductRouter')
const dotenv = require("dotenv").config()

app.get('/', function (req, res) {
  res.send('Hello World my name is de')
  console.log("server started at port number  3000");
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(process.env.PORT);
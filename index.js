const express = require('express');
const connectDB = require('./src/config/dbconfig');
const cors = require('cors');
const morgan = require('morgan');
const { bootstrap } = require('./src/bootstrap');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('uploads'));

app.get("/", (req, res) => {
  res.send("Welcome");
});

// Connect to Database
connectDB();

bootstrap(app);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

const db = require('./config/db').database;

// database connection
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology:true})
.then(() => {
    console.log('Database connected successfully');
})
.catch((err) => {
    console.log('Unable to connect database',err);
})

// Defining Port 
const port = process.env.PORT || 5000 ;

// core middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

const ProductRoute = require('./routes/apis/hospital')

app.use('/api',ProductRoute)

app.get('/',(req,res) => {
    res.send('<h1>Running...</h1>')
});

// cls

app.listen(port, () => {
    console.log('Server started on port', port)
});
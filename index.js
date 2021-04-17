const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
app.use(express.json());
app.use(cors({ origin: '*' }));
const port = process.env.PORT;

const db = require('./config/db').database;
const hospital = require('./models/hospital')

// database connection
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology:true})
.then(() => {
    console.log('Database connected successfully');
})
.catch((err) => {
    console.log('Unable to connect database',err);
})


app.get('/hospitals',(req,res,next) => {
  hospital.find()
         .then((hospitals) => {
             res.json(hospitals);
         })
         .catch((err) => console.log('err',err))
});

app.post('/hospital/add', (req,res,next) => {
  let newHospital = new hospital(req.body)

  newHospital.save()
         .then((hospital) => {
             res.json(hospital);
         })
         .catch((err) => console.log('err',err))
});

app.put('/hospital/update/:id', (req,res,next) => {
  let id = req.params.id;

  hospital.findById(id)
         .then((hospital) => {
          hospital.hospitalName = req.body.hospitalName ? req.body.hospitalName : hospital.hospitalName
          hospital.contact = req.body.contact ? req.body.contact : hospital.contact
          hospital.createdDt = req.body.createdDt ? req.body.createdDt : hospital.createdDt
          hospital.bed = req.body.bed ? req.body.bed : hospital.bed
          hospital.address = req.body.address ? req.body.address :hospital.address
          hospital.updatedDt = new Date()
          hospital.save()
             .then((hospital) => {
                 res.send({message:"hospital updated successfully",hospital:hospital})
             })
             .catch((err) => console.log('err',err))
         })
         .catch((err) => console.log('err',err))
});

app.delete('/hospital/:id', (req,res,next) => {
  let id = req.params.id;

  hospital.findById(id)
         .then((hospital) => {
             hospital.delete()
             .then((hospital) => {
                 res.send({message:"hospital deleted successfully",hospital:hospital})
             })
             .catch((err) => console.log('err',err))
         })
         .catch((err) => console.log('err',err))
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is up on port ' + port);
})
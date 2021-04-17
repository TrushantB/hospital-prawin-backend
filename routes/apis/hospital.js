const express = require('express');
const router = express.Router();
const hospital = require('../../models/hospital');

router.get('/hospitals',(req,res,next) => {
    hospital.find()
           .then((hospitals) => {
               res.json(hospitals);
           })
           .catch((err) => console.log('err',err))
});

router.post('/hospital/add', (req,res,next) => {
    let newHospital = new hospital(req.body)

    newHospital.save()
           .then((hospital) => {
               res.json(hospital);
           })
           .catch((err) => console.log('err',err))
});

router.put('/hospital/update/:id', (req,res,next) => {
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

router.delete('/hospital/:id', (req,res,next) => {
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

module.exports = router ;
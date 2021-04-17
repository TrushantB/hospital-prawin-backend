const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema ({
  hospitalName : {
      type: String,
  },
  address : {
   addressLine1:{
    type: String,
   },
   addressLine2:{
    type: String,
   }
  },
  contact : {
    type: String,
  },
  bed : {
    totalBed:{
      type: Number,
     },
     oxygenBed:{
      type: Number,
     },
     ventilatorBed:{
      type: Number,
     },
     remainingBed:{
      type: Number,
     },
     oxygenOccupiedBed:{
      type: Number,
     },
     ventilatorOccupiedBed:{
      type: Number,
     }
  },
  createdDt : {
    type: Date,
    default: Date.now
  },
  updatedDt : {
    type: Date,
  }  
})

const hospital = module.exports = mongoose.model('hospital', hospitalSchema);
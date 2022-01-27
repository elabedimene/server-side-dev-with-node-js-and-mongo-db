const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
var leadSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    Image: {
        type: String,
        required: true
    },
   
designation: {
    type: String,
    default: ''
},
abbr: {
    type: String,
    required: true,
    min: 0
},
description: {
    type: String,
    required: true,
    min: 0
},
featured: {
    type: Boolean,
    default:false  
}    
},{ 

    timestamps: true
});

var leaders = mongoose.model('lead', leadSchema);

module.exports = leaders;
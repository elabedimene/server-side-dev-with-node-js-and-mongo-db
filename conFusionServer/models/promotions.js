const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
var promoSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    Image: {
        type: String,
        required: true
    },
   
label: {
    type: String,
    default: ''
},
price: {
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

var promotions = mongoose.model('promo', promoSchema);

module.exports = promotions;
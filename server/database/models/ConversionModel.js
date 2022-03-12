const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversionSchema = new Schema({
    fromCurrency: String,
    toCurrency:String,
    conversionDate:String

});

module.exports =  mongoose.model('conversion', ConversionSchema);


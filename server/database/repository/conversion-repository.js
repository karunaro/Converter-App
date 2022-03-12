const { formatDate } = require('exchange-rates-api/src/utils');
const { ConversionModel } = require('../models');

//Dealing with data base operations
class ConversionRepository {

    async CreateConversion({from,to}){
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        
        const conversiondatenow = (year + "-" + month + "-" + date + " " );
        try{
            const conversion = new ConversionModel({
                fromCurrency:from,
                toCurrency:to,
                conversionDate:conversiondatenow
            })
            const conversionResult = await conversion.save();
            return conversionResult;
        }catch(err){
            console.log(err)
        }
    }
    
    async FindConversions(){
        try{
            const conversion = await ConversionModel.find();
              console.log(conversion);
              return conversion;
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = ConversionRepository;
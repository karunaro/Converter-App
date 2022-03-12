const { ConversionRepository } = require("../database");
const config = require('../config');
const axios = require('axios');




// All Business logic will be here
class ConversionService {

    constructor(){
        this.repository = new ConversionRepository();
    }

    

    async Convert(conversionInputs){

    try {
        const {fromCurrency,toCurrency,amountToConvert} = conversionInputs;
        let Value;
        let rates;
        await axios.get('http://api.currencylayer.com/live?access_key=913c07bfe3faac3237e05b0f9924ae04').then(resp => {
            rates = resp.data;
        });
        switch(`${fromCurrency}${toCurrency}`) {
            case "USDEUR":
                Value =amountToConvert*rates.quotes["USDEUR"];
            break;
            case "USDCHF":
                Value =amountToConvert*rates.quotes["USDCHF"];
            break;
            case "EURUSD":
                Value =amountToConvert/rates.quotes["USDEUR"];
            break;
            case "CHFUSD":
                Value =amountToConvert/rates.quotes["USDCHF"];
            break;
            case "CHFEUR":
                Value =(amountToConvert/rates.quotes["USDCHF"])*rates.quotes["USDEUR"];
            break;
            case "EURCHF":
                Value =(amountToConvert/rates.quotes["USDEUR"])*rates.quotes["USDCHF"];
            break;
            default:
                Value= amountToConvert;
        }

        console.log(Value);
        return(Value);
        
        } catch (err) {
            console.log(err)
        };
    

   
    }
    async getConversions(){

        try {
            const conversions = await this.repository.FindConversions();
            return(conversions);
            
        } catch (err) {
            console.log(err)
        };
        

       
    }
    async saveConversion(conversionInputs){

        try {
            const {fromCurrency,toCurrency,amountToConvert,Value} = conversionInputs;
        const from=amountToConvert+fromCurrency;
        const to= Value+toCurrency;
        console.log(from+"test"+to)
            const conversions = await this.repository.CreateConversion({from,to});
            return (conversions);
            
        } catch (err) {
            console.log(err)
        };
        

       
    }
    

    

}

module.exports = ConversionService;
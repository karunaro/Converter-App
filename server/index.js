const express = require('express');
const { databaseConnection } = require('./database');
const ConversionService = require('./services/conversion-service');
// const cors = require('cors');


const app = express();


app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3006"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// app.use(cors());

const service = new ConversionService();
const StartDb = async() => {
await databaseConnection();
}
StartDb();
app.post('/convert', async(req,res)=>{
     const { fromCurrency,toCurrency,amountToConvert } = req.body;
     console.log(req+"dad"+req.body);
        try {
            
            const Value = await service.Convert({fromCurrency,toCurrency,amountToConvert});
            await service.saveConversion({fromCurrency,toCurrency,amountToConvert,Value});
            res.json({value:Value});

        } catch (error) {
            if(error.response) {
                console.log(error.response.data)
            } else if(error.request) {
                console.log(error.request)
            } else {
                console.log('Error', error.message)
            }
        }
    });

    app.get('/getConversions', async(req,res)=>{

        try {
            const  data  = await service.getConversions();
            return res.json({data});
        } catch (err) {
            return res.status(404).json({message:"User does not exists"});
        }

    });

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log('listening.......'));



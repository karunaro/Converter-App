const express = require('express');
const { databaseConnection } = require('./database');
const ConversionService = require('./services/conversion-service');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");



const app = express();


app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3006"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




const service = new ConversionService();
const StartDb = async () => {
    await databaseConnection();
}
StartDb();
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'converter app  API',
            version: '1.0.0',
            description: 'Converter app for front developer ',
            contact: {
                name: 'neji',
                email: 'mednejighazouani@gmail.com'
            },
            servers: ["http://localhost:3000"]
        },


    },
    apis: ["index.js"]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
/**
  * @swagger
  * /convert:
  *  post:
  *   summary: convert
  *   description: Convert 1USD to Euro
  *   requestBody:
  *     content:
  *         application/json:
  *             schema:
  *                 type: object
  *                 properties:
  *                     fromCurrency:
  *                      type: string
  *                     toCurrency:
  *                      type: string
  *                     amountToConvert:
  *                      type: integer
  *                 example:
  *                     fromCurrency: "USD"
  *                     toCurrency: "EUR"
  *                     amountToConvert: 1
  *                 
  *   responses:
  *    200:
  *     description: Converted succesfully
  */
app.post('/convert', async (req, res) => {
    const { fromCurrency, toCurrency, amountToConvert } = req.body;

    try {


        const Value = await service.Convert({ fromCurrency, toCurrency, amountToConvert });
        await service.saveConversion({ fromCurrency, toCurrency, amountToConvert, Value });
        res.json({ value: Value });

    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
        } else if (error.request) {
            console.log(error.request)
        } else {
            console.log('Error', error.message)
        }
    }
});
/**
 * @swagger
 * /getConversions:
 *  get:
 *    description: get all Conversions
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/getConversions', async (req, res) => {

    try {
        const data = await service.getConversions();
        return res.json({ data });
    } catch (err) {
        return res.status(404).json({ message: "User does not exists" });
    }

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening.......'));
module.exports = app;


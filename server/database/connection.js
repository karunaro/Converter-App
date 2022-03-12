const mongoose = require('mongoose');
const { 
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT
} = require('../config');

const mongoURL=`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;


module.exports = async() => {
    
    try {
        await mongoose
            .connect(mongoURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(()=> console.log("succesfully connected to DB"))
            .catch((e)=> {
                    console.log(e);
            });
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
 
};

 
const mongoose = require("mongoose");


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
 
        console.log("Conectado con éxito a la DB");
 
    } catch (error){
 
        console.log("Error al conectarse a la DB ", error);
        
    }
};


module.exports = { connectDB }
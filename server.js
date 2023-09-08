const express = require('express')
const serverConfig = require('./configs/server.config')
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.congif')
const userModel = require('./models/user.model')
const bcrypt = require('bcrypt')

const app = express();


/**
 * Logic to connect MongoDB and create an ADMIN User
 * Need to have the mongodb up and running in your local machine
 */

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on("error" , ()=>{
    console.log("Error while connecting to database");
});

db.once("open",()=>{
    console.log("DB is connected");


    init();
})

async function  init()
{
    /**
     * Intialise the mongo db
     * 
     * 
     * Need to create the ADMIN user
     */
      
    // check if the admin user already present or not

    const  admin = await userModel.findOne({
        userId : "admin"
    })

    if(admin){
        console.log("admin user already present...");
        return;
    }
    admin = await userModel.create({
        name : "Vishnu Vardhan",
        userId : "admin",
        email : "vishnu@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("Welcome1",8)
    })
   console.log(admin);
   


}


app.listen(serverConfig.PORT, ()=>{
    console.log("Server is started...");
})


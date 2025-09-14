const mongoose = require("mongoose")


const ConnectDB = async ()=>{
    
    try {

        const connection = await mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log(`Database Connected !!:)`)
        })
        
    } catch (error) {
        console.log(`Error : ${error}`)
        process.exit(1) // exit if the error is given 
    }

}

module.exports = ConnectDB
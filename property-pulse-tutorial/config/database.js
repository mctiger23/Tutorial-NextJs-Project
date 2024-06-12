import mongoose from 'mongoose'; 

let connected = false; 

const connectDB = async () => {
    mongoose.set('strictQuery', true); //only fields that are specified in a schema will be stored in the DB


    // if the database is already connected, dont connect again 
    // Using NextJS API Route 

    if (connected) {
        console.log('MongoDB is already Connected '); 
        return; 
    }

    //connect to mongoDB

    try {
        await mongoose.connect(process.env.MONGODB_URI); 
        connected = true; 
        console.log('MongoDB Connected');
    } catch (error){
        console.log(error); 
    }

}

export default connectDB
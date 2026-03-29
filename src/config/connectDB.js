import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        throw error; // Throw error instead of exiting process
    }
};

export default connectDB;

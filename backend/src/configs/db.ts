import mongoose from 'mongoose';

class Database {
  public static async connect(): Promise<void> {
    try {
      await mongoose.connect(
        process.env.MONGO_URI || 'mongodb://localhost:27017/blog',
      );
      console.log('✅ MongoDB connected');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    }
  }
}

export default Database;

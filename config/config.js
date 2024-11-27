import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
  mongoUrl:
    process.env.MONGODB_URI ||
    `mongodb://localhost:${process.env.MONGO_PORT || '27017'}/mernclassroom`,
};

export default config;

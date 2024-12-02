import expressApp from './express';
import config from '../config/config.js'
import mongoose from 'mongoose'
const server = expressApp;
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

mongoose.Promise=global.Promise;

mongoose.connect(config.mongoUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
  console.info('successfully connected to mongoDB')
})

mongoose.connection.on('error',(err)=>{
  console.error(`MongoDb connection error:${err.message}`)
})

require('dotenv').config();
const Redis = require('ioredis');

const redis = new Redis({
  host: REDIS_HOST, 
  port: REDIS_PORT,        
  // password: 'your-password' // if using cloud Redis
});

module.exports = redis;

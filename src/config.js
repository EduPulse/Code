const dotenv = require('dotenv');
dotenv.config();

module.exports =Object.freeze({
    version:'0.8',
    clients:{
        unsplash:{
            access_key:process.env.ACCESS_KEY
        }
    }
})
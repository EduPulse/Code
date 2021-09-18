const dotenv = require('dotenv');
dotenv.config();

console.log()
module.exports =Object.freeze({
    version:'0.8',
    clients:{
        unsplash:{
            access_key:process.env["REACT_APP.ACCESS_KEY"]
        }
    }
})
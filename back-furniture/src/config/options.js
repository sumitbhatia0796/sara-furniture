const pjson = require('./../../package.json');
module.exports = {

    env: cleanString(process.env.NODE_ENV, "test"),
    secretKey: cleanString(process.env.secretKey,'secretKey') ,
    db: {
        useSSL: cleanBoolean(process.env.DB_ATLAS, false),
        host: cleanString(process.env.DB_HOST, 'localhost'),
        name: cleanString(process.env.DB_NAME, 'furniture'),
        username: cleanString(process.env.DB_USERNAME),
        password: cleanString(process.env.PASSWORD),
        configString: cleanString(process.env.DB_CONFIG_STRING)  // "?retryWrites =true&w=majority"

    },
    name: pjson.name,
    port: cleanInteger(process.env.PORT, 3000)
};

function cleanURL(string, defaultValue){
    if(!string) return defaultValue;
    string = string.trim();
    if(!string) return defaultValue;
    if(!(string.startsWith("http://") || string.startsWith("https://")))
    return "http://" + string;

   return string;
}

function cleanString(string, defaultValue){
    if(!string) return defaultValue;
    string = string.trim();
    if(!string) return defaultValue;

   return string;
}

function cleanBoolean(string, defaultValue){
    if(!string) return defaultValue;
    string = string.trim();
    if(!string) return defaultValue;

    const lowerString =string.toLowerCase();
    if(
        ["true", "1", "yes","y","on"].includes(lowerString)
    )
    return true;
  return false;  
}

function cleanInteger(string, defaultValue){
    if(!string) return defaultValue;
    string = string.trim();
    if(!string) return defaultValue;

   if(!isNaN(string) && !string.includes(".")){
     return parseInt(string,10);
   }
   return parseInt(defaultValue,10);
}
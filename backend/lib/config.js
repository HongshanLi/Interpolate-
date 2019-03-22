// Create and export env vairables

let environments = {};

environments.dev = {
  "env": "dev",
  "MONGO_ATLAS_PW": "experiment",
  "serverUrl": "https://interpolate.io",
  "JWT_KEY": "secret_key_to_generate_token",
  //"ASSETS_DIR": __dirname + "/../assets/personal",
  //"GROUPASSETS_DIR": __dirname + "/../assets/group",
  //"CLASSASSETS_DIR": __dirname + "/../assets/class",
  "tmpPassLength": 20,
  "stagingServerIp": "206.189.199.148",
  "stagingServerUsername": "hongshan",
  "stagingServerPassword": "$$myawesomeapp2018$$",
}


environments.prod = {
  "env": "prod",
  "MONGO_ATLAS_PW": "experiment",
  "serverUrl": "https://interpolate.io",
  "JWT_KEY": "secret_key_to_generate_token",
  //"ASSETS_DIR": __dirname + "/../assets/personal",
  //"GROUPASSETS_DIR": __dirname + "/../assets/group",
  //"CLASSASSETS_DIR": __dirname + "/../assets/class",
  "tmpPassLength": 20,
  "tmpPassLength": 20,
  "stagingServerIp": "206.189.199.148",
  "stagingServerUsername": "hongshan",
  "stagingServerPassword": "$$myawesomeapp2018$$",
}


let currentEnv = typeof(process.env.PM2_ENV) == "string" ?
process.env.PM2_ENV.toLowerCase() : '';

let envToExport = typeof(environments[currentEnv]) == "object"?
environments[currentEnv] : environments.dev;

module.exports = envToExport;

const dotenv = require('dotenv');
const { existsSync } = require('fs');

function loadConfig() {
    console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`)
    const envFile =
        process.env.NODE_ENV && existsSync(`.env.${process.env.NODE_ENV}`)
            ? `.env.${process.env.NODE_ENV}`
            : '.env';
    dotenv.config({ path: envFile });
    console.log("Loading config from the env file: " + envFile);
}

module.exports = loadConfig;

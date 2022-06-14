const dotenv = require('dotenv');
const { existsSync } = require('fs');

function loadConfig() {
    const NODE_ENV = process.env.NODE_ENV?.trim();
    const envFile = NODE_ENV && existsSync(`.env.${NODE_ENV}`) ? `.env.${NODE_ENV}` : '.env';
    dotenv.config({ path: envFile });
}

module.exports = loadConfig;

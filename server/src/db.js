const mongoose = require('mongoose');

function initializeDatabase() {
    (async () => {
        try {
            await mongoose.connect(process.env.DB_CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (error) {
            console.log(error);
        }
    })();
}

module.exports = initializeDatabase;

function errorHandler(err, req, res, next){
    console.log("error handler middleware invoked with error:",err);

    if (err.name === 'MongoServerError' && err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        res.status(409).json({
            error: `An account with ${key} ${err.keyValue[key]} is already exists.`,
        });
    } else {
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
};

module.exports = errorHandler;

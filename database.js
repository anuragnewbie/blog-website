const mongoose = require('mongoose');

// establishing connection to the mongoDB database server
module.exports = function connect() {
    try {
        const mongoUrl = "mongodb+srv://admin_anurag:Anur@g1995@cluster0.oyb7q.mongodb.net/blog";
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        console.log("Connected to the database successfully...")
    } catch(err) {
        console.log(err);
        res.status(500).send("An unexpected error occured at server side...");
    }
}

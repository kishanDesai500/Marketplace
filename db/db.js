const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = require("bluebird");

const db = mongoose.createConnection(process.env.DBURL);

db.on("disconnected", () => {
    console.log("Mongoose connection disconnected for master DB");
});

db.on("connected", () => {
    console.log("Mongoose connection open to master DB");
});

// If the connection throws an error
db.on("error", (err) => {
    console.log(`Mongoose connection error for master DB: ${err}`);
});

// When the connection is disconnected

// When connection is reconnected
db.on("reconnected", () => {
    console.log("Mongoose connection reconnected for master DB");
});
// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
    db.close(() => {
        console.log(
            "Mongoose connection disconnected for master DB through app termination"
        );
        // eslint-disable-next-line no-process-exit
        process.exit(0);
    });
});
module.exports = db;
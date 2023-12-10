// Importing the mongoose module, which is an ODM (Object Data Modeling) library for MongoDB and Node.js.
// It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/merntravellog');

// Exporting the mongoose connection object.
// This allows other files in the application to import and use this established database connection.
module.exports = mongoose.connection;

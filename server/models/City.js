const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const citySchema = new Schema({

  // saved book id from GoogleBooks
  cityId: {
    type: String,
    required: true,
  },
  formattedAddress: {
    type: String,
  },
  cityName: {
    type: String,
  },
  countyName: {
    type: String,
  },
  stateName: {
    type: String,
  },
  countryName: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },

});

module.exports = citySchema;
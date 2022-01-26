'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FiltersSchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  });
  return mongoose.model('Filters', FiltersSchema);
};

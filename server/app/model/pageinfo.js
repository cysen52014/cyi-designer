'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PageInfoSchema = new Schema({
    path: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  });
  return mongoose.model('PageInfo', PageInfoSchema);
};

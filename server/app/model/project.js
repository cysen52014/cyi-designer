'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ProjectSchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    hostname: {
      type: String,
      required: true,
    },
    apiurl: {
      type: String,
      required: true,
    },
    port: {
      type: String,
    },
  });
  return mongoose.model('Project', ProjectSchema);
};

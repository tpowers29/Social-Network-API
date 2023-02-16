const { Schema, Types } = require('mongoose');
const formatDate = require("../utils/formatDate");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 4,
    },
    username: {
   
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timeStamp => formatDate(timeStamp)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;

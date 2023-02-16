const { Schema, model } = require('mongoose');
const reactionSchema = require('./Assignment');
const formatDate = require("../utils/formatDate");

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timeStamp => formatDate(timeStamp)
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },

    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function(){
  return this.reaction.length
})

const Student = model('thought', thoughtSchema);

module.exports = thought;

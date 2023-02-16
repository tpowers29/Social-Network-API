const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {

  getthoughts(req, res) {
    thought.find()
      .then(async (thought) => {
        const thoughtObj = {
          thought,
          headCount: await headCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSinglethought(req, res) {
    thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought,
            grade: await grade(req.params.thoughtId),
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createthought(req, res) {
    thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
 
  deletethought(req, res) {
    thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : Course.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { thought: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
            message: 'thought deleted, but no courses found',
          })
          : res.json({ message: 'thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeAssignment(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

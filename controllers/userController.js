const { Users, Student } = require('../models');

module.exports = {
  // Get all usersDatas
  getUsers(req, res) {
    Users.find()
      .then((Users) => res.json(usersData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a usersData
  getSingleUsers(req, res) {
    Users.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((usersData) =>
        !usersData
          ? res.status(404).json({ message: 'No usersData with that ID' })
          : res.json(usersData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a usersData
  createUsers(req, res) {
    Users.create(req.body)
      .then((usersData) => res.json(usersData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a usersData
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userId })
      .then((usersData) =>
        !usersData
          ? res.status(404).json({ message: 'No usersData with that ID' })
          : Student.deleteMany({ _id: { $in: usersData.students } })
      )
      .then(() => res.json({ message: 'Users and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a usersData
  updateUsers(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((usersData) =>
        !usersData
          ? res.status(404).json({ message: 'No usersData with this id!' })
          : res.json(usersData)
      )
      .catch((err) => res.status(500).json(err));
  },
};

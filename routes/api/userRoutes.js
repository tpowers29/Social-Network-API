const router = require('express').Router();
const {
  getUsers,
  getSingleUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require('../../controllers/UsersController.js');

router.route('/').get(getUsers).post(createUsers);

router
  .route('/:userId')
  .get(getSingleUsers)
  .put(updateUsers)
  .delete(deleteUsers);

module.exports = router;

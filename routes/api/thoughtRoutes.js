const router = require('express').Router();
const {
  getthought,
  getSinglethought,
  createthought,
  deletethought,
  addAssignment,
  removeAssignment,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getthought).post(createthought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSinglethought).delete(deletethought);

// /api/thoughts/:thoughtId/assignments
router.route('/:thoughtId/assignments').post(addAssignment);

// /api/thoughts/:thoughtId/assignments/:assignmentId
router.route('/:thoughtId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;

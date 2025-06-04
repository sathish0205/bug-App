const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');

router.get('/bug_get', bugController.getBugs);
router.post('/add_bugs', bugController.createBug);
router.put('/:id', bugController.updateBug);
router.delete('/:id', bugController.deleteBug);

module.exports = router;
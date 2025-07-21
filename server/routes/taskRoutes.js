const express =  require("express");
const router = express.Router();
const taskController = require ('../controllers/taskController');

router.post('/',taskController.createTask);
router.get('/user/:user_id',taskController.getTasks);
router.put('/:task_id',taskController.editTask);
module.exports = router;
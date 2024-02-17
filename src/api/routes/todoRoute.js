const router = require("express").Router();
const { addTodo, getAllTodo, deleteTaskById } = require("../controllers/todo");

router.post(
    "/add",
    addTodo.validator,
    addTodo.controller
);
router.get(
    "/get-all",
    getAllTodo.controller
);
router.delete(
    "/complete-task/:id",
    deleteTaskById.validator,
    deleteTaskById.controller
);

module.exports = router;

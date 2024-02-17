const celebrate = require("celebrate").celebrate;
const { CONTROLLER, VALIDATOR } = require("../../utils/constants");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const httpStatus = require("http-status");
const Todo = require("../../../models/todo");

const addTodo = {
    [VALIDATOR]: celebrate({
        body: Joi.object()
            .keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                dueDate: Joi.date().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const { title, description, dueDate } = req.body;
            const todoModel = new Todo({ title, description, dueDate });
            await todoModel.save();
            return res.status(httpStatus.OK).json({
                message: "Todo Added successfully",
                success: true,
                data: { title, description, dueDate },
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE ADDING BOOK : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const getAllTodo = {
    [CONTROLLER]: async (req, res) => {
        try {
            const allTodo = await Todo.find({}).sort([["createdAt", -1]]);
            return res.status(httpStatus.OK).json({
                message: "Todo list got successfully",
                success: true,
                data: allTodo,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE getting Todo list: ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const deleteTaskById = {
    [VALIDATOR]: celebrate({
        params: Joi.object()
            .keys({
                id: Joi.objectId().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            await Todo.findByIdAndDelete(req.params.id);
            return res.status(httpStatus.OK).json({
                message: "Task completed successfully",
                success: true,
                data: {},
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE deleting Task : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};
module.exports = {
    addTodo,
    getAllTodo,
    deleteTaskById,
};

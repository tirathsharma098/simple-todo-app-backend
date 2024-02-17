const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todoSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date
    }
}, {
    timestamps: true
});

const Todo = model("Todo", todoSchema);

module.exports = Todo;

"use strict";
// models/task.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
    },
    status: {
        type: String,
        enum: ['to-do', 'in-progress', 'completed'],
        default: 'to-do',
    },
    historyLogs: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
const Task = mongoose_1.default.model('Task', taskSchema);
module.exports = Task;

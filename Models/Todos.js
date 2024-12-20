const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    task :{
        type:String,
        default:false
    }
})

const TaskModel = mongoose.model("todos",todoSchema)
module.exports =TaskModel
const mongoose = require("mongoose");

const TakenExamSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        examId: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }
)

const TakenExam = mongoose.model("TakenExam", TakenExamSchema);

module.exports = TakenExam
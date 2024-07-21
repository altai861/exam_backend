const Exam = require("../models/Exam.js");


async function getExams(req, res) {
    const exams = await Exam.find().lean();
    return res.status(200).json(exams);
}

async function addExam(req, res) {
    const { questions, name } = req.body;
    if (!questions || !name) {
        return res.status(400).json({ "message": "Name and questions are required" });
    }
    const newExam = new Exam({ questions, name });
    newExam.save();
    return res.status(200).json(newExam);
}

async function updateExam(req, res) {
    const examId = req.params.id;
   const { questions, name } = req.body;
   if (!questions && !name) {
    return res.status(400).json({ "message": "Name or questions are required to update" });
   }

   const exam = await Exam.findById(examId).exec();
   if (!exam) {
    return res.status(400).json({ "message": "Exam not found" });
   }

   if (questions) {
    exam.questions = questions
    exam.save();
   }

   if (name) {
    exam.name = name;
    exam.save()
   }

   return res.status(200).json(exam)
}


async function getExam(req, res) {
    const examId = req.params.id;
    const exam = await Exam.findById(examId).exec();
    if (!exam) {
        return res.status(400).json({ "message": "Exam not found" })
    }

    return res.status(200).json(exam)
}


async function deleteExam(req, res) {
    const examId = req.params.id;
    const deletedExam = await Exam.findByIdAndDelete(examId);
    if (!deletedExam) {
        return res.status(400).json({ "message": "Exam not found" })
    }
    return res.status(200).json(deletedExam)
}

module.exports = {
    getExams,
    addExam,
    updateExam,
    getExam,
    deleteExam
}
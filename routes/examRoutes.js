const express = require("express");
const router = express.Router();
const examControllers = require("../controllers/examControllers.js");

router.route("/")
    .get(examControllers.getExams)
    .post(examControllers.addExam)

router.route("/:id")
    .put(examControllers.updateExam)
    .get(examControllers.getExam)
    .delete(examControllers.deleteExam)

module.exports = router
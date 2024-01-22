const mongoose = require('mongoose');
const Courses = require('../models/courses');

// create Imge URL
const createImage = async (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:3001/node/api/core/images/${req.file.filename}`,
  });
};


const createCourseFields = async (req, res) => {
  const course = new Courses({
    courseImage: req.body.courseImage,
    courseTitle: req.body.courseTitle,
    shortDescrp: req.body.shortDescrp,
    longDescrp: req.body.longDescrp,
    courseCategory: req.body.courseCategory,
    courseLevel: req.body.courseLevel,
    courseLanguage: req.body.courseLanguage,
    lectures: req.body.lectures,
    price: req.body.price,
    period: req.body.period,
    purchaseDate: req.body.purchaseDate,
    videoLink: req.body.videoLink,
  });
  console.log(course);
  await course.save();
  console.log('saved');
  res.status(200).json({ message: 'Course Creation successful', course });
};

// get all courses
const getCourses = async (req, res) => {
  const courses = await Courses.find().sort({ createdAt: -1 });
  res.status(200).json(courses);
};

// delete a single course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such imagedata' });
  }

  const course = await Courses.findOneAndDelete({ _id: id });

  if (!course) {
    return res.status(404).json({ error: 'no such imagedata' });
  }
  return res.status(200).json(course);
};

module.exports = {
  getCourses,
  deleteCourse,

  createImage,
  createCourseFields,
};

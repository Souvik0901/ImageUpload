const mongoose = require('mongoose');
const Courses = require('../models/courses');



const createCourseWithImage = async (req, res) => {
  try {

    if (req.file) {

      const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/node/api/core/images/${req.file.filename}`;
      
      // Continue with course creation
      const course = new Courses({
        courseImage: imageUrl,
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

      await course.save();
      res.status(200).json({ success: 1, message: 'Course creation successful', course });
    } else {
      res.status(400).json({ success: 0, message: 'Image upload failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, message: 'Internal server error' });
  }
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

  createCourseWithImage,
};

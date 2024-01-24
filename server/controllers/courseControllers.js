const mongoose = require('mongoose');
const Courses = require('../models/courses');




const createCourseWithImage = async (req, res) => {
 

  try {
    if (req.file) {
      const imageUrl = `/node/api/core/images/${req.file.filename}`;

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
        user_id: req.user.userId,
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

  const { userId } = req.user;
  const courses = await Courses.find({ user_id: userId }).sort({ createdAt: -1 });
  if (!courses) {
    return res.status(401).json({ message: 'Customer does not exists' });
  }
  res.status(200).json(courses);
};

// delete a single course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such courseCollections' });
  }

  const course = await Courses.findOneAndDelete({ _id: id });

  if (!course) {
    return res.status(404).json({ error: 'no such courseCollections' });
  }
  return res.status(200).json(course);
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ success: 0, message: 'Invalid course ID' });
    }

    // Find the existing course by ID
    const existingCourse = await Courses.findById(courseId);

    if (!existingCourse) {
      return res.status(404).json({ success: 0, message: 'Course not found' });
    }

    // Update the course fields based on the request body
    existingCourse.courseTitle = req.body.courseTitle || existingCourse.courseTitle;
    existingCourse.shortDescrp = req.body.shortDescrp || existingCourse.shortDescrp;
    existingCourse.longDescrp = req.body.longDescrp || existingCourse.longDescrp;
    existingCourse.courseCategory = req.body.courseCategory || existingCourse.courseCategory;
    existingCourse.courseLevel = req.body.courseLevel || existingCourse.courseLevel;
    existingCourse.courseLanguage = req.body.courseLanguage || existingCourse.courseLanguage;
    existingCourse.lectures = req.body.lectures || existingCourse.lectures;
    existingCourse.price = req.body.price || existingCourse.price;
    existingCourse.period = req.body.period || existingCourse.period;
    existingCourse.purchaseDate = req.body.purchaseDate || existingCourse.purchaseDate;
    existingCourse.videoLink = req.body.videoLink || existingCourse.videoLink;

    // Check if an image is being uploaded
    if (req.file) {
      existingCourse.courseImage = `/node/api/core/images/${req.file.filename}`;
    }

    // Save the updated course
    await existingCourse.save();

    res
      .status(200)
      .json({ success: 1, message: 'Course update successful', course: existingCourse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }

  return null;
};

module.exports = {
  getCourses,
  deleteCourse,
  updateCourse,
  createCourseWithImage,
};


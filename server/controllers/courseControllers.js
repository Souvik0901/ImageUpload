const mongoose = require('mongoose');
const Courses = require('../models/courses');


//create a single course
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
      res
        .status(200)
        .json({ code: 200, success: 1, message: 'Course creation successful', course });
    } else {
      res.status(200).json({ code: 401, success: 0, message: 'Image upload failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, success: 0, message: 'Internal server error' });
  }
};





// get all courses
const getCourses = async (req, res) => {
  const { userId } = req.user;

  const search = req.query.search || '';
  const query = {
    courseTitle: { $regex: search, $options: 'i' },
  };
  const courses = await Courses.find({ user_id: userId, ...query }).sort({ createdAt: 1 });

  if (!courses) {
    return res.status(200).json({ code: 401, codemessage: 'Customer does not exists' });
  }
  return res.status(200).json({ code: 200, courses });
};





// get all paginated courses
const paginatedCourses = async (req, res) => {
  const { userId } = req.user;

  const search = req.query.search || '';
  const query = {
    courseTitle: { $regex: search, $options: 'i' },
  };

  const sortoption = req.query.sort || '';

  try {
    const courses = await Courses.find({ user_id: userId, ...query }).sort({
      purchaseDate: sortoption === 'Newest' ? -1 : 1,
    });

    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalcourse = courses.length;
    results.pageCount = Math.ceil(courses.length / limit);

    if (lastIndex < courses.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = courses.slice(startIndex, lastIndex);

    if (!courses || courses.length === 0) {
      return res.status(200).json({ code: 401, message: 'No Courses Found' });
    }

    return res.status(200).json({ code: 200, ...results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: 'Internal server error' });
  }
};






// delete a single course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ code: 401, error: 'No such courseCollections' });
  }

  const course = await Courses.findOneAndDelete({ _id: id });

  if (!course) {
    return res.status(200).json({ code: 401, error: 'no such courseCollections' });
  }
  return res.status(200).json({ code: 200, course });
};



//Update a course
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(200).json({ code: 401, success: 0, message: 'Invalid course ID' });
    }

    // Find the existing course by ID
    const existingCourse = await Courses.findById(courseId);

    if (!existingCourse) {
      return res.status(200).json({ code: 401, success: 0, message: 'Course not found' });
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
      .json({ code: 200, success: 1, message: 'Course update successful', course: existingCourse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, success: 0, message: 'Internal server error' });
  }

  return null;
};




module.exports = {
  getCourses,
  paginatedCourses,
  deleteCourse,
  updateCourse,
  createCourseWithImage,
};


